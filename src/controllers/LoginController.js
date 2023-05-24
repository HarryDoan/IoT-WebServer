const database = require("../database/sensor/sensorDatabase");
class LoginController {
  index(req, res) {
    let data = null;
    database.getHistory().then((r) => {
      data = r.data;
      res.render("login", { admin: "Wietech", history: data });
    });
  }
}

module.exports = new LoginController();
