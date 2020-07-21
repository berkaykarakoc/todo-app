import React from "react";
import "./TodoList.css";

// import TodoItem
import TodoItem from "./TodoItem";

const TodoList = ({ todos, checkHandler, deleteHandler }) => {
    return (
        <div>
            <ul className="movieList">
                {todos.map((item) => {
                    return (
                        <TodoItem
                            key={item._id}
                            item={item}
                            checkHandler={checkHandler}
                            deleteHandler={deleteHandler}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
