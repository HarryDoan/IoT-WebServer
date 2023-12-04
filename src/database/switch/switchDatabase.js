const db = require("../db");
const helper = require("../helper");
const config = require("../config");

async function fetchDataFromTable(query) {
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getAll(tableName) {
  const query = `SELECT * FROM List_Switch_${tableName}`;

  return fetchDataFromTable(query);
}

async function updateSwitchValues(params) {
  const tableName = params?.[0];
  const values = params?.[1]?.split("-");

  const promises = values.map((value, index) => {
    const query = `UPDATE List_Switch_${tableName} SET value = ? WHERE switch_id = ?`;
    const params = [value, `switch${index + 1}`];
    return db.query(query, params);
  });

  return Promise.all(promises);
}

async function updateSwitchValuesByID(switchParams, tableName = "917756715") {
  const switchId = switchParams?.switch_id;
  const value = JSON.stringify(switchParams?.value);

  const query = `UPDATE List_Switch_${tableName} SET value = ? WHERE switch_id = ?`;
  const params = [value, switchId];
  return db.query(query, params);
}

async function addNewSwitch(switchParams) {
  const tableName = "917756715";
  const value = 0;
  const switchId = switchParams?.switch_id;
  const type = switchParams?.type;
  const title = switchParams?.title;
  const name = switchParams?.title;

  const query = `INSERT INTO List_Switch_${tableName} (switch_id, value, type, title, name) VALUES (?, ?, ?, ?, ?)`;
  const params = [switchId, value, type, title, name];

  try {
    const result = await db.query(query, params);
    return { success: true, insertedRow: result[0] };
  } catch (error) {
    console.error("Error adding new switch:", error);
    return { success: false, error: "Failed to add new switch" };
  }
}

module.exports = {
  getAll,
  updateSwitchValues,
  updateSwitchValuesByID,
  addNewSwitch,
};
