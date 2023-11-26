const database = require("../services//firebase/config");
const sensorDatabase = require("../database/sensor/sensorDatabase");
const switchDatabase = require("../database/switch/switchDatabase");
const dbrt = require("../services/firebase/config");

class DashboardController {
  async dashboard(req, res) {
    res.locals.title = "Dashboard";
    const admin = "Wietech";
    const phone = res.locals.user;

    const switches = await switchDatabase.getAll(phone);
    const dataSwitch = switches.data;
    const newDataSwitch = dataSwitch?.map((item) => {
      return { ...item, value: +item?.value, type: +item?.type };
    });
    database
      .ref(`/EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk/${admin}/switches1`)
      .set(newDataSwitch);
    const refSensorsRealtime = dbrt
      .ref("EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk")
      .child(admin);

    const callback = (snapshot) => {
      const dataSensor = snapshot.val()?.sensors;
      // const dataSwitch = snapshot.val()?.switches1;
      res.render("dashboard", {
        title: res.locals.title,
        dataSensor,
        dataSwitch: newDataSwitch,
      });

      refSensorsRealtime.off("value", callback);
    };

    refSensorsRealtime.on("value", callback);
  }
}

module.exports = new DashboardController();
