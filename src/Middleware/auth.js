const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const token = req.headers.cookie?.slice(4);

  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.redirect("/");
    }

    next();
  });
}

module.exports = authenticateToken;
