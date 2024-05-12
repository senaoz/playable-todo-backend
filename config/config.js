require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "todo_user",
    password: process.env.DB_PASSWORD || "password123",
    database: process.env.DB_NAME || "todo_app",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
