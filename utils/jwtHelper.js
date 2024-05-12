const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "secret";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY );
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
