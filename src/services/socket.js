const schedule = require("node-schedule");
const moment = require("moment-timezone");
const dbrt = require("./firebase/config");
const dbSensor = require("..//database/sensor/sensorDatabase");
const dbUser = require("..//database/user/userDatabase");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const switchDatabase = require("../database/switch/switchDatabase");
const sensorDatabase = require("../database/sensor/sensorDatabase");
const { addSwitch } = require("../database/switch");
const { v4: uuidv4 } = require("uuid");
class SocketServices {
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });
    socket.on("login", async (e) => {
      dbUser.getUser().then((data) => {
        const listUser = data?.data;
        const phone = e.username.slice(1);
        const password = e.password;
        const userPhone = listUser?.filter((item) => item?.phone === phone);
        if (userPhone?.length > 0) {
          if (password === userPhone?.[0]?.password) {
            const token = jwt.sign({ phone }, accessTokenSecret, {
              expiresIn: accessTokenLife,
            });
            socket.emit("bingo_password", token);

            switchDatabase.getAll(e.username.slice(1)).then((switches) => {
              const dataSwitch = switches.data;
              socket.emit("dataSwitch", dataSwitch);
            });
          } else {
            socket.emit("wrong_password", "Your password is incorrect");
          }
        }
      });
    });
    async function fetchAndLogSensorData() {
      try {
        const data = await sensorDatabase.getAll("917756715");
        socket.emit("sensor_data", data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    }

    async function fetchAndLogSwitchesData() {
      try {
        const data = await switchDatabase.getAll("917756715");
        socket.emit("switch_data", data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    }

    fetchAndLogSwitchesData();
    fetchAndLogSensorData();

    const interval1 = setInterval(fetchAndLogSensorData, 2000);
    const interval2 = setInterval(fetchAndLogSwitchesData, 2000);
    dbrt
      .ref("/EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk/Wietech")
      .on("value", (snapshot) => {
        const dataSensor = snapshot.val().sensors;
        socket.emit("NewDataSensor", dataSensor);
      });
    socket.on("updateSwitches", (switches) => {
      switchDatabase.updateSwitchValuesByID(switches);
    });

    socket.on("admin", async (admin) => {
      // Log pressure data
      const ref_pressure_valve1 = dbrt
        .ref("EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk")
        .child(`${admin}/p_valve_1`);
      const ref_pressure_valve2 = dbrt
        .ref("EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk")
        .child(`${admin}/p_valve_2`);
      let pressure_valve1;
      let pressure_valve2;
      ref_pressure_valve1.on("value", (snap) => {
        pressure_valve1 = snap.val();
        socket.emit("p_valve_1", pressure_valve1 || 0);
      });
      ref_pressure_valve2.on("value", (snap) => {
        pressure_valve2 = snap.val();
        socket.emit("p_valve_2", pressure_valve2 || 0);
      });
    });

    socket.on("history", (e) => {
      //History Pressure in Mysql for export Excel
      dbSensor.getHistory(e).then((result) => {
        let data = result.data;
        const convertedData = data.map((item) => {
          const newItem = { ...item };
          newItem.time = moment
            .tz(item.time, "UTC")
            .clone()
            .tz("Asia/Ho_Chi_Minh")
            .format();
          return newItem;
        });
        socket.emit("list_history_Mysql", data);
      });
    });

    socket.on("addSwitch", (e) => {
      const uid = uuidv4();
      addSwitch({ ...e, switch_id: uid });
    });

    socket.on("addSensor", (e) => {
      const uid = uuidv4();
      dbSensor.addNewSensor({ ...e, sensor_id: uid });
    });

    for (let i = 0; i < 3; i++) {
      socket.on(`date_time_${i}`, (e) => {
        console.log("this is data: ", e);
      });
    }
  }
}
module.exports = new SocketServices();
