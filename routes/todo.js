const express = require("express");
const router = express.Router();

const { Todo } = require("../models/todo");

// Create a new todo
router.post("/", async (req, res) => {
  let { title, description, status, due_date, UserId, image, tags } = req.body;
  status = status || false;

  const todo =
    (await Todo?.create({ title, description, status, due_date, UserId, image, tags })) ||
    "Error creating todo";
  res.json(todo);
});

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// Get a todo by id
router.get("/:id", async (req, res) => {
  const todo =await Todo.findByPk(req.params.id);
  res.json(todo);
});

// Update a todo
router.put("/:id", async (req, res) => {
  const todo = await Todo?.findByPk(req.params.id);
  const { title, description, status, due_date, UserId } = req.body;
  todo.title = title;
  todo.description = description;
  todo.status = status;
  todo.due_date = due_date;
  todo.UserId = UserId;
  await todo.save();
  res.json(todo);
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const todo = await Todo?.findByPk(req.params.id);
  await todo.destroy();
  res.json({ message: "Todo deleted successfully" });
});

module.exports = router;
