const database = require("../database/sensor/sensorDatabase");
class DashboardController {
  dashboard(req, res) {
    let data = null;
    database.getAll().then((r) => {
      data = r.data;
      res.render("dashboard", { data: data });
    });
  }
}

module.exports = new DashboardController();
