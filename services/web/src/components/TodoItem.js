import React from "react";
import "./TodoItem.css";

const TodoItem = ({ item, checkHandler, deleteHandler }) => {
    // Check Item when clicked on the item
    const checkItem = () => {
        checkHandler(item._id);
    };

    // Delete Item when delete button is clicked
    const deleteItem = () => {
        deleteHandler(item._id);
    };

    return (
        <li id={`${item.checked ? "checked" : ""}`} className={`movie`}>
            <span onClick={checkItem}>{item.text}</span>
            <span onClick={deleteItem} className="deleteBtn" type="button">
                X
            </span>
        </li>
    );
};

export default TodoItem;
