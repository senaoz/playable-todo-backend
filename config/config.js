require("dotenv").config();

module.exports = {
  development: {
    username: "todo_user",
    password: "password123",
    database: "todo_app",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
