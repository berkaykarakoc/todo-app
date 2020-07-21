import React, { Component } from "react";
import "./App.css";

// import InputBox component
import InputBox from "./components/InputBox";

// import TodoList component
import TodoList from "./components/TodoList";

const initialState = {
    todos: [],
    textField: "",
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/todos")
            .then((response) => response.json())
            .then((todos) => this.setState({ todos: todos }));
    }

    // Update text value in the current state when a change
    // occurs in input box
    onInputBoxChange = (event) => {
        this.setState({ textField: event.target.value });
    };

    // Add todo item to the todo list
    // Update todos array in the current state when an item
    // is added
    addHandler = (event) => {
        event.preventDefault();

        // If text field is empty return
        if (this.state.textField.trim().length === 0) {
            console.log("Empty Input");
            this.setState({ textField: "" });
            return;
        }

        fetch("http://localhost:3001/api/todos", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: this.state.textField,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const added = this.state.todos;
                added.push(data);
                this.setState({
                    todos: added,
                    textField: "",
                });
            })
            .catch((err) => console.log(err));
    };

    // Delete todo item with the given id from the todo list
    // Update todos array in the current state when an item
    // is deleted
    deleteHandler = (_id) => {
        fetch(`http://localhost:3001/api/todos/${_id}`, {
            method: "delete",
        })
            .then((response) => response.json())
            .then((data) => {
                const deleted = this.state.todos.filter(
                    (todo) => todo._id !== data._id
                );
                this.setState(
                    Object.assign(this.state, {
                        todos: deleted,
                    })
                );
            })
            .catch((err) => console.log(err));
    };

    // Check todo item
    // Update checked attribute with the given id in todos array
    // in the current state
    checkHandler = (_id) => {
        fetch(`http://localhost:3001/api/todos/${_id}`, {
            method: "put",
        })
            .then((response) => response.json())
            .then((data) => {
                this.state.todos.map((todo, i) => {
                    if (todo._id === _id) {
                        this.setState(
                            Object.assign(this.state.todos[i], {
                                checked: data,
                            })
                        );
                    }
                    return todo;
                });
            })
            .catch((err) => console.log(err));
    };

    render() {
        const { todos, textField } = this.state;
        return (
            <div className="container">
                <div>
                    <header>Todo App</header>
                </div>
                <InputBox
                    text={textField}
                    addHandler={this.addHandler}
                    onInputBoxChange={this.onInputBoxChange}
                />
                <TodoList
                    todos={todos}
                    checkHandler={this.checkHandler}
                    deleteHandler={this.deleteHandler}
                />
                <footer>
                    <p className="love">
                        Made with{" "}
                        <span role="img" aria-label="heart">
                            ❤️
                        </span>{" "}
                        by Berkay Karakoç
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;
