import React from "react";
import "./InputBox.css";

const InputBox = ({ text, addHandler, onInputBoxChange }) => {
    // Add item when add button is clicked
    const addItem = (event) => {
        addHandler(event);
    };

    return (
        <div className="inputDiv">
            <form onSubmit={addItem}>
                <input
                    className="movieInput"
                    placeholder="Add todos"
                    onChange={onInputBoxChange}
                    value={text}
                />
                <button id="addBtn" className="inputBtns" type="submit">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default InputBox;
