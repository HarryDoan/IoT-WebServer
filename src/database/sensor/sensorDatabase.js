const db = require("../db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const rows = await db.query(`SELECT * FROM Sensors`);

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getHistory(page = 1) {
  const rows = await db.query(`SELECT * FROM History`);

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getSchedule(page = 1) {
  const rows1 = await db.query(`SELECT * FROM Schedule_Sensor_1`);
  const rows2 = await db.query(`SELECT * FROM Schedule_Sensor_2`);

  const data1 = helper.emptyOrRows(rows1);
  const data2 = helper.emptyOrRows(rows2);
  const data = {
    data1,
    data2,
  };
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function updatedSensor(data) {
  const query =
    "UPDATE Sensors SET pressure = ?, time_updated = ? WHERE sensor_id = ?";
  const params = [data.pressure, data.time_updated, data.sensor_id];
  const dataSensor = await db.query(query, params);

  return dataSensor;
}

module.exports = {
  getAll,
  updatedSensor,
  getHistory,
  getSchedule,
};
