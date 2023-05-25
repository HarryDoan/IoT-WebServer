const database = require("../database/sensor/sensorDatabase");

class ChartController {
  async chart(req, res) {
    const r = await database.getAll();
    res.render("chart", {
      admin: "Wietech",
    });
  }
}

module.exports = new ChartController();
