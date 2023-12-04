const {
  getAll,
  updateSwitchValues,
  addNewSwitch,
} = require("./switchDatabase");

const getAllSwitches = async (tableName) => {
  return await getAll(tableName);
};

const updateSwitchValue = async (params) => {
  await updateSwitchValues(params);

  return params;
};

const addSwitch = async (params) => {
  await addNewSwitch(params);

  return params;
};

module.exports = {
  getAllSwitches,
  updateSwitchValue,
  addSwitch,
};
