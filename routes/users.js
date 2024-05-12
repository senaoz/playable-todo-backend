const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { models } = require("../sequelize");

const { User, Todo } = models;

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get all todos for a user
router.get("/:id/todos", async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.params.id } });
  res.json(todos);
});

// Update all todo statuses for a user
router.put("/:id/todos-status", async (req, res) => {
  const { status } = req.body;
  await Todo.update({ status }, { where: { userId: req.params.id } });
  res.json({ message: "Todos updated successfully" });
});

// Delete all todos for a user
router.delete("/:id/todos", async (req, res) => {
  await Todo.destroy({ where: { userId: req.params.id } });
  res.json({ message: "Todos deleted successfully" });
});

// Get a user by id
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// Update a user
router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const { email, password, firstName, lastName } = req.body;
  user.email = email;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();
  res.json(user);
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
