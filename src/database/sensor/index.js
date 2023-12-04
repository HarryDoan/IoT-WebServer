const {
  getAll,
  updateSensor,
  updateSensorValues,
  addNewSensor,
} = require("./sensorDatabase");

const getAllSensors = async (tableName) => {
  return await getAll(tableName);
};

const updateSensorValue = async (params) => {
  // const formattedDate = new Date().toLocaleString("en-US", {
  //   timeZone: "Asia/Bangkok",
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });

  // const dataUpdated = {
  //   ...changes,
  //   time_updated: formattedDate,
  // };

  await updateSensorValues(params);

  return params;
};

const updateOneSensor = async (changes) => {
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dataUpdated = {
    ...changes,
    time_updated: formattedDate,
  };

  await updateSensor(dataUpdated);

  return dataUpdated;
};

const addSensor = async (params) => {
  await addNewSensor(params);

  return params;
};

module.exports = {
  getAllSensors,
  updateOneSensor,
  updateSensorValue,
  addSensor,
};
