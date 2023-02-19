const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const { getUser, createUser } = require("./data")

const getAllUser = async () => {
  try {
    const users = await getUser()
    return users

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

const createUsers = async (data) => {

    const users = await getUser()
    const isAlreadyAdded =
     users.data.findIndex((user) => user.phone === data.phone) > -1;
    if (isAlreadyAdded) {
      return false;
    }
    createUser(data)
    return data;

};

// const updateOneSensor = (SensorId, changes) => {
//   try {
//     const isAlreadyAdded =
//       DB.Sensors.findIndex((Sensor) => Sensor.name === changes.name) > -1;
//     if (isAlreadyAdded) {
//       throw {
//         status: 400,
//         message: `Sensor with the name '${changes.name}' already exists`,
//       };
//     }
//     const indexForUpdate = DB.Sensors.findIndex(
//       (Sensor) => Sensor.id === SensorId
//     );
//     if (indexForUpdate === -1) {
//       throw {
//         status: 400,
//         message: `Can't find Sensor with the id '${SensorId}'`,
//       };
//     }
//     const updatedSensor = {
//       ...DB.Sensors[indexForUpdate],
//       ...changes,
//       updatedAt: new Date().toLocaleString("en-US", { timeZone:  'Asia/Bangkok' }),
//     };
//     DB.Sensors[indexForUpdate] = updatedSensor;
//     saveToDatabase(DB);
//     return updatedSensor;
//   } catch (error) {
//     throw { status: error?.status || 500, message: error?.message || error };
//   }
// };

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
  getAllUser,
  createUsers
};