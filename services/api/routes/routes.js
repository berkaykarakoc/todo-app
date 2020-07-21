const { Router } = require("express");

const todoController = require("../controllers/todo-controller");

const router = Router();

// Database connection
const { conn } = require("../connections/database-connection");

// GET: Get todo items
router.get("/todos", todoController.getAllTodos(conn));

// POST: Add new todo item
router.post("/todos", todoController.createTodo(conn));

// GET: Get todo item with given id
router.get("/todos/:id", todoController.getTodo(conn));

// PUT: Check todo item with given id
router.put("/todos/:id", todoController.checkTodo(conn));

// DELETE: Delete todo item with given id
router.delete("/todos/:id", todoController.deleteTodo(conn));

module.exports = router;
