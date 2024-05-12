const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const Sequelize = require("sequelize");
const config = require("./config/config");
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todo");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "PostgreSQL database connection has been established successfully.",
    );
  })
  .catch((err) => {
    console.error("PostgreSQL database connection error: ", err);
  });

const modelDefiners = [
  require('./models/user.js'),
  require('./models/todo.js'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World");
});
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });

  if (user) {
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(403);
  }
});

// Logout endpoint
app.post("/api/logout", authenticateToken, (req, res) => {
  res.json({ message: "User logged out successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = sequelize;