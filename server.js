const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/users");
const routes = require("./routes");
const todoRoutes = require("./routes/todo");
const sequelize = require("./sequelize");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors());

app.use("/", routes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  console.log(`Starting To Do App for Payable Factory on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(
      `Express server started on port ${PORT}. Try some routes, such as '/api/users'.`,
    );
  });
}

init();
