const { v4: uuid } = require("uuid");

const Sensor = require("../database/sensor");

const getAllSensors = () => {
  try {
    const allSensors = Sensor.getAllSensors();
    return allSensors;
  } catch (error) {
    throw error;
  }
};

const getOneSensor = (SensorId) => {
  try {
    const Sensor = Sensor.getOneSensor(SensorId);
    return Sensor;
  } catch (error) {
    throw error;
  }
};

const createNewSensor = (newSensor) => {
  const SensorToInsert = {
    ...newSensor,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdSensor = Sensor.createNewSensor(SensorToInsert);
    return createdSensor;
  } catch (error) {
    throw error;
  }
};

const updateOneSensor = (SensorId, changes) => {
  try {
    const updatedSensor = Sensor.updateOneSensor(SensorId, changes);
    return updatedSensor;
  } catch (error) {
    throw error;
  }
};

const deleteOneSensor = (SensorId) => {
  try {
    Sensor.deleteOneSensor(SensorId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllSensors,
  getOneSensor,
  createNewSensor,
  updateOneSensor,
  deleteOneSensor,
};
