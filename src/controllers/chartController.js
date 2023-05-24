const database = require("../database/sensor/sensorDatabase");
const jwt = require("jsonwebtoken");
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
class ChartController {
  chart(req, res) {
    const { token } = req.query;
    const dashboardURL = `/dashboard?token=${token}`;
    const chartURL = `/chart?token=${token}`;
    const historyURL = `/history?token=${token}`;
    const scheduleURL = `/schedule?token=${token}`;
    res.locals.URL_token = {
      dashboardURL,
      chartURL,
      historyURL,
      scheduleURL,
    };
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        res.render("chart", { user_token: null });
      } else {
        let data = null;
        database.getAll().then((r) => {
          // data = r.data;
          res.render("chart", { admin: "Wietech", user_token: token });
        });
      }
    });
  }
}

module.exports = new ChartController();
