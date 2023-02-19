const { v4: uuid } = require("uuid");

const user = require("../database/user");

const getAllUsers = async () => {
  try {
    const allUsers = await user.getAllUser();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const checkLogin = async (data) => {
  const phone = data.phone;
  const password = data.password;
  const allUsers = await user.getAllUser();

  try {
    const checkUser = allUsers.data.find(
      (user) => user.phone === phone && user.password === password
    );
    return checkUser;
  } catch (error) {
    return false;
  }
};

const createNewUser = async (newUser) => {
  const userToInsert = {
    ...newUser,
    createdAt: new Date().toLocaleString({ timeZone: "Asia-Bangkok" }),
    updatedAt: new Date().toLocaleString({ timeZone: "Asia-Bangkok" }),
  };

  const users = await user.createUsers(userToInsert);
  if (users) {
    return users;
  }
  return false;
};

module.exports = {
  getAllUsers,
  checkLogin,
  createNewUser,
};
