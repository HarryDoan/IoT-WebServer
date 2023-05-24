const database = require("../database/sensor/sensorDatabase");
const jwt = require("jsonwebtoken");
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
class ScheduleController {
  index(req, res) {
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
        res.render("schedule", { user_token: null });
      } else {
        let data = null;
        database.getSchedule().then((r) => {
          data = r.data;
          res.render("schedule", {
            list_schedule_valve1: data?.data1,
            list_schedule_valve2: data?.data2,
            user_token: token,
          });
        });
      }
    });
  }
}

module.exports = new ScheduleController();
