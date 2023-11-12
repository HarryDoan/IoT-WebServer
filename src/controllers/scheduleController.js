const database = require("../database/sensor/sensorDatabase");

class ScheduleController {
  async index(req, res) {
    res.locals.title = "Schedule";

    const r = await database.getSchedule();
    const { data1, data2 } = r.data;

    res.render("schedule", {
      list_schedule_valve1: data1,
      list_schedule_valve2: data2,
    });
  }
}

module.exports = new ScheduleController();
