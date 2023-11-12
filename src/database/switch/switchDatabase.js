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

module.exports = {
  getAll,
  updateSwitchValues,
  updateSwitchValuesByID,
};
