const database = require("../database/sensor/sensorDatabase");

class DashboardController {
  async dashboard(req, res) {
    const r = await database.getAll();
    const data = r.data;
    res.render("dashboard", {
      data,
    });
  }
}

module.exports = new DashboardController();
