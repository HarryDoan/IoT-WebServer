const schedule = require("node-schedule");
const moment = require("moment-timezone");
const dbrt = require("./firebase/config");
const dbSensor = require("..//database/sensor/sensorDatabase");
const dbUser = require("..//database/user/userDatabase");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
class SocketServices {
  //connection socket

  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });
    socket.on("login", (e) => {
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
          } else {
            socket.emit("wrong_password", "Your password is incorrect");
          }
        }
      });
    });

    socket.on("check_user_token", (e) => {
      jwt.verify(e, accessTokenSecret, (err, decoded) => {
        console.log("====================================");
        console.log(decoded);
        console.log("====================================");
      });
    });

    socket.on("admin", (admin) => {
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

      // Get list pressure to chart
      const ref_history = dbrt
        .ref("EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk")
        .child(`${admin}/history_pressure`);
      ref_history.on("value", (snap) => {
        socket.emit("list_pressure", snap.val());
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

    for (let i = 0; i < 3; i++) {
      socket.on(`date_time_${i}`, (e) => {
        console.log("this is data: ", e);
      });
    }
  }
}
module.exports = new SocketServices();
