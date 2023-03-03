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

async function updatedSensor(data) {
  console.log(data);
  const dataSensor = await db.query(
    `UPDATE Sensors SET value = ${data.value}, time_updated = '${data.time_updated}' WHERE sensor_name = '${data.sensor_name}'`
  );

  return dataSensor;
}

module.exports = {
  getAll,
  updatedSensor,
};
