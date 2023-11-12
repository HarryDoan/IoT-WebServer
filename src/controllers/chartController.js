const database = require("../database/sensor/sensorDatabase");

class ChartController {
  async chart(req, res) {
    res.locals.title = "Chart";

    // const r = await database.getAll("917756715");
    res.render("chart", {
      admin: "Wietech",
    });
  }
}

module.exports = new ChartController();
