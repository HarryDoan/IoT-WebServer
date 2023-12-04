const db = require("../db");
const helper = require("../helper");
const config = require("../config");
const database = require("../../services//firebase/config");

async function fetchDataFromTable(query) {
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getAll(tableName = "Sensors") {
  const query = `SELECT * FROM List_Sensor_${tableName}`;
  return fetchDataFromTable(query);
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

async function updateSensorValues(params) {
  const tableName = params?.[0];
  const values = params?.[1]?.split("-");
  const promises = values.map((value, index) => {
    const query = `UPDATE List_Sensor_${tableName} SET value = ? WHERE sensor_id = ?`;
    const params = [value, `sensor_${index + 1}`];
    return db.query(query, params);
  });

  // database
  //   .ref("/EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk/Wietech")
  //   .on("value", (snapshot) => {
  //     const dataSensor = snapshot.val().sensors;
  //     for (const sensorKey in dataSensor) {
  //       database
  //         .ref(
  //           `/EWA4tWTQAgiVf9AJiYbAxUKsew2lbZqk/Wietech/sensors/${sensorKey}/value`
  //         )
  //         .set(values[Object.keys(dataSensor).indexOf(sensorKey)].toString());
  //     }
  //   });
  return Promise.all(promises);
}

async function updateSensor(data) {
  const query =
    "UPDATE Sensors SET pressure = ?, time_updated = ? WHERE sensor_id = ?";
  const params = [data.pressure, data.time_updated, data.sensor_id];
  return await db.query(query, params);
}

async function addNewSensor(sensorParams) {
  const tableName = "917756715";
  const value = 0;
  const sensorId = sensorParams?.sensor_id;
  const title = sensorParams?.title;
  const name = sensorParams?.title;
  const suffix = sensorParams?.unit;

  const query = `INSERT INTO List_Sensor_${tableName} (sensor_id, value, suffix, title, name) VALUES (?, ?, ?, ?, ?)`;
  const params = [sensorId, value, suffix, title, name];

  try {
    const result = await db.query(query, params);
    return { success: true, insertedRow: result[0] };
  } catch (error) {
    console.error("Error adding new sensor:", error);
    return { success: false, error: "Failed to add new sensor" };
  }
}
module.exports = {
  getAll,
  updateSensor,
  getHistory,
  getSchedule,
  updateSensorValues,
  addNewSensor,
};
