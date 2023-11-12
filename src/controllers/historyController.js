const database = require("../database/sensor/sensorDatabase");

class HistoryController {
  async index(req, res) {
    res.locals.title = "History";

    const r = await database.getHistory();
    const data = r.data;

    res.render("history", {
      admin: "Wietech",
      history: data,
    });
  }
}

module.exports = new HistoryController();
