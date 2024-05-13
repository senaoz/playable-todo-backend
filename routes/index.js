const express = require("express");
const router = express.Router();
const { models } = require("../sequelize");
const { User, AuthToken } = models;
const { generateToken } = require("../utils/jwtHelper");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  res.send("Hello World");
});

// Login endpoint, passwords are hashed before being stored in the database so we need to hash the password before comparing it to the stored hash
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const token = generateToken(user);
  AuthToken.create({
    token,
    userId: user.id,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.json({ token, user });
});

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (token == null) return res.sendStatus(401);

  const authToken = await AuthToken.findOne({ where: { token } });
  if (!authToken) return res.sendStatus(403);

  return next();
};

// Logout endpoint
router.post("/api/logout", authenticateToken, (req, res) => {
  AuthToken.destroy({ where: { token: req.headers["authorization"] } });
  res.json({ message: "User logged out successfully" });
});

// Image upload endpoint return the file url to be stored in the database or used in the frontend
// Image upload endpoint receives base64 encoded image and saves it to the uploads folder
router.post("/api/upload", async (req, res) => {
  const { image } = req.body;
  if (image) {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const fileName = Date.now() + ".png";
    require("fs").writeFile(
      `uploads/${fileName}`,
      base64Data,
      "base64",
      function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Error uploading image" });
        }
        res.json({ url: `/uploads/${fileName}` });
      },
    );
  }
});

// Serve the uploaded images to use in the frontend as url (example: http://localhost:8080/uploads/1715527153151.png)
router.use("/uploads", express.static("uploads"));

module.exports = router;
