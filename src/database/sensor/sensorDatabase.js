const db = require("../db");
const helper = require("../helper");
const config = require("../config");

async function fetchDataFromTable(query, page = 1) {
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

async function getAll(page = 1) {
  const query = `SELECT * FROM Sensors`;
  return fetchDataFromTable(query, page);
}

async function getHistory(page = 1) {
  const query = `SELECT * FROM History`;
  return fetchDataFromTable(query, page);
}

async function getSchedule(page = 1) {
  const query1 = `SELECT * FROM Schedule_Sensor_1`;
  const query2 = `SELECT * FROM Schedule_Sensor_2`;
  const [rows1, rows2] = await Promise.all([
    db.query(query1),
    db.query(query2),
  ]);
  const data1 = helper.emptyOrRows(rows1);
  const data2 = helper.emptyOrRows(rows2);
  const data = { data1, data2 };
  const meta = { page };
  return {
    data,
    meta,
  };
}

async function updateSensor(data) {
  const query =
    "UPDATE Sensors SET pressure = ?, time_updated = ? WHERE sensor_id = ?";
  const params = [data.pressure, data.time_updated, data.sensor_id];
  return await db.query(query, params);
}

module.exports = {
  getAll,
  updateSensor,
  getHistory,
  getSchedule,
};
