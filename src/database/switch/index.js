const { getAll, updateSwitchValues } = require("./switchDatabase");

const getAllSwitches = async (tableName) => {
  return await getAll(tableName);
};

const updateSwitchValue = async (params) => {
  await updateSwitchValues(params);

  return params;
};

module.exports = {
  getAllSwitches,
  updateSwitchValue,
};
