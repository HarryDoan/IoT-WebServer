const { log } = require("handlebars");
const SensorService = require("../services/sensorService");

const getAllSensors = async (req, res) => {
  try {
    const allSensors = await SensorService.getAllSensors();
    res.send({ status: "OK", data: allSensors.data });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const getOneSensor = (req, res) => {
  const {
    params: { SensorId },
  } = req;
  if (!SensorId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':SensorId' can not be empty",
      },
    });
  }
  try {
    const Sensor = SensorService.getOneSensor(SensorId);
    res.send({ status: "OK", data: Sensor });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

// const createNewSensor = (req, res) => {
//   const { body } = req;
//   if (
//     !body.name ||
//     !body.mode ||
//     !body.equipment ||
//     !body.exercises ||
//     !body.trainerTips
//   ) {
//     res.status(400).send({
//       status: "FAILED",
//       data: {
//         error:
//           "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
//       },
//     });
//     return;
//   }
//   const newSensor = {
//     name: body.name,
//     mode: body.mode,
//     equipment: body.equipment,
//     exercises: body.exercises,
//     trainerTips: body.trainerTips,
//   };
//   try {
//     const createdSensor = SensorService.createNewSensor(newSensor);
//     res.status(201).send({ status: "OK", data: createdSensor });
//   } catch (error) {
//     res.status(error?.status || 500).send({
//       status: "FAILED",
//       data: {
//         error: error?.message || error,
//       },
//     });
//   }
// };

const updateOneSensor = async (req, res) => {
  const { body } = req;

  try {
    const updatedSensor = await SensorService.updateOneSensor(body);
    res.send({ status: "OK", data: updatedSensor });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const deleteOneSensor = (req, res) => {
  const {
    params: { SensorId },
  } = req;
  if (!SensorId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':SensorId' can not be empty",
      },
    });
  }
  try {
    SensorService.deleteOneSensor(SensorId);
    res.status(204).send({ status: "OK", data: "delete successful" });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

module.exports = {
  getAllSensors,
  getOneSensor,
  // createNewSensor,
  updateOneSensor,
  // deleteOneSensor,
  // getRecordsForSensor,
};
