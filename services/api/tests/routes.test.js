const request = require("supertest");
const app = require("..");
const Todo = require("../models/Todo.js");

const { setupDB } = require("./test-setup");

// Setup a Test Database
setupDB(process.env.DATABASE_NAME);

// Continue with your tests...

test("should get all todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(0);

    const newTodo = new Todo({
        text: "todo",
    });
    const todo = await request(app).post("/api/todos").send(newTodo);
    expect(todo.statusCode).toEqual(200);

    const res2 = await request(app).get("/api/todos");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.length).toEqual(1);

    const res3 = await request(app).get("/api/todos").send({});
    expect(res3.statusCode).toEqual(400);
    expect(res3.body).toEqual("unable to get todos");
});

test("should get a todo", async () => {
    const newTodo = new Todo({
        text: "todo",
    });
    const todo = await request(app).post("/api/todos").send(newTodo);
    expect(todo.statusCode).toEqual(200);

    const res = await request(app).get(`/api/todos/${todo.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(todo.body._id);

    const res2 = await request(app).get(`/api/todos/${1}`);
    expect(res2.statusCode).toEqual(404);
    expect(res2.body).toEqual("not found");
});

test("should create a new post", async () => {
    const newTodo = new Todo({
        text: "todo",
    });
    const res = await request(app).post("/api/todos").send(newTodo);
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toEqual("todo");

    const newTodo2 = new Todo();
    const res2 = await request(app).post("/api/todos").send(newTodo2);
    expect(res2.statusCode).toEqual(400);
    expect(res2.body).toEqual("unable to add");
});

test("should check item", async () => {
    const todo = await request(app).post("/api/todos").send({
        text: "todo3",
    });
    expect(todo.statusCode).toEqual(200);

    const res = await request(app).put(`/api/todos/${todo.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(true);

    const res2 = await request(app).put(`/api/todos/${1}`);
    expect(res2.statusCode).toEqual(404);
    expect(res2.body).toEqual("not found");
});

test("should delete item", async () => {
    const todo = await request(app).post("/api/todos").send({
        text: "todo4",
    });
    expect(todo.statusCode).toEqual(200);

    const res = await request(app).delete(`/api/todos/${todo.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(todo.body._id);

    const res2 = await request(app).delete(`/api/todos/${1}`);
    expect(res2.statusCode).toEqual(404);
    expect(res2.body).toEqual("unable to delete");
});
