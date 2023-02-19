const Joi = require("joi");
const userService = require("../services/userService");
const { v4: uuid } = require("uuid");

let userId = null;

const validateUser = (data) => {
  const schema = Joi.object({
    phone: Joi.string().min(9).max(10).required(),

    password: Joi.string().min(6),
    role: Joi.string().valid("ADM", "USER", "MOD").required(),
  });
  return schema.validate(data);
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

const checkLogin = async (req, res, next) => {
  const { error } = validateUser(req.body);

  const checkPhone = () => {
    const phone = req.body.phone;
    if (phone.split("")[0] === "0") {
      const newPhone = phone.slice(1, phone.length);
      return newPhone;
    }
    return phone;
  };

  // if (error) {
  //   res.status(400).send({
  //     status: "FAILED",
  //     data: {
  //       error: error.details[0].message,
  //     },
  //   });
  // } else {

  const user = {
    phone: checkPhone(),
    password: req.body.password,
  };
  const checkUser = await userService.checkLogin(user);
  if (checkUser) {
    userId = checkUser.user_id;
    console.log(userId);
    res.send({
      status: "OK",
      data: checkUser,
    });
  } else {
    res.send({
      status: "FAILED",
      error: "Your phone or password is incorrect",
    });
  }
};
// };

const createNewUser = async (req, res) => {
  const checkPhone = () => {
    const phone = req.body.phone;
    if (phone.split("")[0] === "0") {
      const newPhone = phone.slice(1, phone.length);
      return newPhone;
    }
    return phone;
  };

  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: error.details[0].message,
      },
    });
  } else {
    const newUser = {
      phone: checkPhone(),
      password: req.body.password,
      role: req.body.role,
      // id: uuid(),
    };
    const newUsers = await userService.createNewUser(newUser);
    if (newUsers) {
      res.send({
        status: "OK",
        data: newUsers,
      });
    } else {
      res.send({
        status: "FAILED",
        error: `Your phone is ${req.body.phone} already exists`,
      });
    }
  }

  // try {
  //   const createdUser = userService.createNewUser(newUser);
  //   res.status(201).send({ status: "OK1", data: createdUser });
  // } catch (error) {
  //   res.status(error?.status || 500).send({
  //     status: "FAILED",
  //     data: {
  //       error: error?.message || error,
  //     },
  //   });
  // }
};

module.exports = {
  getAllUsers,
  checkLogin,
  createNewUser,
};
