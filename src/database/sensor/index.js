const DB = require("../db.json");
const { saveToDatabase } = require("../utils");
const { getAll, updatedSensor } = require("./sensorDatabase");
const moment = require("moment");
const getAllSensors = async () => {
  try {
    const data = await getAll();
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

// const getOneSensor = (SensorId) => {
//   try {
//     const Sensor = DB.Sensors.find((Sensor) => Sensor.id === SensorId);
//     if (!Sensor) {
//       throw {
//         status: 400,
//         message: `Can't find Sensor with the id '${SensorId}'`,
//       };
//     }
//     return Sensor;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

// const createNewSensor = (newSensor) => {
//   try {
//     const isAlreadyAdded =
//       DB.Sensors.findIndex((Sensor) => Sensor.name === newSensor.name) > -1;
//     if (isAlreadyAdded) {
//       throw {
//         status: 400,
//         message: `Sensor with the name '${newSensor.name}' already exists`,
//       };
//     }
//     DB.Sensors.push(newSensor);
//     saveToDatabase(DB);
//     return newSensor;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

const updateOneSensor = async (changes) => {
  try {
    const inputDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    });
    const outputFormat = "YYYY-MM-DD HH:mm:ss";

    const formattedDate = moment(inputDate, "MM/DD/YYYY, h:mm:ss A").format(
      outputFormat
    );
    const dataUpdated = {
      ...changes,
      time_updated: formattedDate,
    };

    updatedSensor(dataUpdated);

    return dataUpdated;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// const deleteOneSensor = (SensorId) => {
//   try {
//     const indexForDeletion = DB.Sensors.findIndex(
//       (Sensor) => Sensor.id === SensorId
//     );
//     if (indexForDeletion === -1) {
//       throw {
//         status: 400,
//         message: `Can't find Sensor with the id '${SensorId}'`,
//       };
//     }
//     DB.Sensors.splice(indexForDeletion, 1);
//     saveToDatabase(DB);
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

module.exports = {
  getAllSensors,
  // createNewSensor,
  // getOneSensor,
  updateOneSensor,
  // deleteOneSensor,
};
