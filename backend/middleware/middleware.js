require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({
      message: "Anda perlu login",
    });
  } else {
    try {
      const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.id = decode.id;
      next();
    } catch (e) {
      res.status(401).json({
        message: "Illegal login",
      });
    }
  }
};
