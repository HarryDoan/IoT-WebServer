const db = require("./db");
const helper = require("./helper");
const config = require("./config");

async function getUser(page = 1) {
  const rows = await db.query(`SELECT * FROM User`);

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function createUser(data) {
  console.log(data);
  const user = await db.query(
    `INSERT INTO User ( phone, password, role, createdAt, updatedAt)
        VALUES ( ${data.phone}, ${data.password}, '${data.role}', '${data.createdAt}', '${data.updatedAt}')`
  );

  return user;
}

module.exports = {
  getUser,
  createUser,
};
