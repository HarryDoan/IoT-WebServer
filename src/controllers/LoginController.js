const { render } = require("node-sass");
const dbUser = require("../database/user/userDatabase");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

class LoginController {
  async index(req, res) {
    res.render("login");
  }

  async login(req, res) {
    try {
      const { phone, password } = req.body;
      const { data } = await dbUser.getUser();

      const listUser = data;
      const userPhone = phone?.slice(1);
      const userPass = password;
      const user = listUser?.find((item) => item?.phone === userPhone);

      if (user && userPass === user?.password) {
        const token = jwt.sign({ userPhone }, accessTokenSecret, {
          expiresIn: accessTokenLife,
        });
        res.cookie("jwt", token);
        res.redirect("/dashboard");
      } else {
        return res.status(401).send("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new LoginController();
