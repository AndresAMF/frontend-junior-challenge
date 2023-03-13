import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const todos = useSelector((state) => state.todos.items);

  const todosDone = todos.filter((todo) => todo.checked === true);

  return <div className="todo-results">Done:{todosDone.length}</div>;
};

export default TodoResults;
