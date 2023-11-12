const SwitchService = require("../../services/switchService");

const getAllSwitches = async (req, res) => {
  const tableName = req?.params?.slug;

  try {
    const allSwitches = await SwitchService.getAllSwitches(tableName);
    const listData = allSwitches?.data.map((item) => {
      return item && item?.value;
    });

    res.send({ status: "SUCCESS", data: listData?.join("-") });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const updateSwitchValue = async (req, res) => {
  const data = req?.params?.slug?.split(",");

  try {
    const updatedSwitch = await SwitchService.updateSwitchValue(data);
    res.send({ status: "SUCCESS", data: updatedSwitch });
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
  getAllSwitches,
  updateSwitchValue,
};
