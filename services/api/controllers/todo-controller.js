const Todo = require("../models/Todo.js");

// GET: Get todo items
const getAllTodos = (db) => (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) return res.status(400).json("unable to get todos");
        return res.json(todos);
    });
};

// POST: Add new todo item
const createTodo = (db) => (req, res) => {
    const { text } = req.body;
    const newTodo = new Todo({ text: text });
    newTodo.save((err, newTodo) => {
        if (err) return res.status(400).json("unable to add");
        return res.json(newTodo);
    });
};

// GET: Get todo item with given id
const getTodo = (db) => (req, res) => {
    const { id } = req.params;
    Todo.findById(id, (err, todo) => {
        if (err) return res.status(404).json("not found");
        return res.json(todo);
    });
};

// PUT: Check todo item with given id
const checkTodo = (db) => (req, res) => {
    const { id } = req.params;
    Todo.findById(id, (err, todo) => {
        if (err) return res.status(404).json("not found");
        todo.checked = !todo.checked;
        todo.save((err, updatedTodo) => {
            if (err) return res.status(400).json("unable to check");
            return res.json(updatedTodo.checked);
        });
    });
};

// DELETE: Delete todo item with given id
const deleteTodo = (db) => (req, res) => {
    const { id } = req.params;
    Todo.findByIdAndDelete(id, (err, deletedTodo) => {
        if (err) return res.status(404).json("unable to delete");
        return res.json(deletedTodo);
    });
};

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    deleteTodo,
    checkTodo,
};
