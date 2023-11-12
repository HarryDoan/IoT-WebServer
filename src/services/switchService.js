const Switch = require("../database/switch");

const getAllSwitches = async (tableName) => {
  try {
    const allSwitches = await Switch.getAllSwitches(tableName);
    return allSwitches;
  } catch (error) {
    throw error;
  }
};

const updateSwitchValue = async (params) => {
  try {
    const updatedSwitch = await Switch.updateSwitchValue(params);
    return updatedSwitch;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSwitches,
  updateSwitchValue,
};
