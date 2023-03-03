const { getUser, createUser } = require("./userDatabase");

const getAllUser = async () => {
  try {
    const users = await getUser();
    return users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const createUsers = async (data) => {
  const users = await getUser();
  const isAlreadyAdded =
    users.data.findIndex((user) => user.phone === data.phone) > -1;
  if (isAlreadyAdded) {
    return false;
  }
  createUser(data);
  return data;
};

module.exports = {
  getAllUser,
  createUsers,
};
