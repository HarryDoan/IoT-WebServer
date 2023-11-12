const { v4: uuid } = require("uuid");

const Sensor = require("../database/sensor");

const getAllSensors = async (tableName) => {
  try {
    const allSensors = await Sensor.getAllSensors(tableName);
    return allSensors;
  } catch (error) {
    throw error;
  }
};

// const createNewSensor = (newSensor) => {
//   const SensorToInsert = {
//     ...newSensor,
//     id: uuid(),
//     createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//     updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//   };
//   try {
//     const createdSensor = Sensor.createNewSensor(SensorToInsert);
//     return createdSensor;
//   } catch (error) {
//     throw error;
//   }
// };

const updateSensorValue = async (params) => {
  try {
    const updatedSensor = await Sensor.updateSensorValue(params);
    return updatedSensor;
  } catch (error) {
    throw error;
  }
};

const updateOneSensor = async (changes) => {
  try {
    const updatedSensor = await Sensor.updateOneSensor(changes);
    return updatedSensor;
  } catch (error) {
    throw error;
  }
};

// const deleteOneSensor = (SensorId) => {
//   try {
//     Sensor.deleteOneSensor(SensorId);
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  getAllSensors,
  // createNewSensor,
  updateOneSensor,
  // deleteOneSensor,
  updateSensorValue,
};
