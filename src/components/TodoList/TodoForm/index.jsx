import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarTodo } from "redux/todoSlice";
import "./styles.css";

function TodoForm() {
  const count = useSelector((state) => state.todos.items).length;
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const newTodo = {
      id: count,
      label: label,
      checked: false,
    };
    dispatch(agregarTodo(newTodo));
  };

  return (
    <>
      <form className="todoForm" onSubmit={submitHandler}>
        <input
          id="inputForm"
          type="text"
          value={label}
          name="label"
          placeholder="Enter new to do"
          onChange={(e) => setLabel(e.target.value)}
        />
        <button
          id="buttonForm"
          disabled={!label}
          className="formButton"
          type="submit"
        >
          ADD TO DO
        </button>
      </form>
    </>
  );
}

export default TodoForm;
