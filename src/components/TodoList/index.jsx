import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerTodos, eliminarTodo, modificarTodo } from "redux/todoSlice";
import TodoListItem from "components/TodoListItem";
import "./styles.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  useEffect(() => {
    dispatch(obtenerTodos());
  }, [dispatch]);

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
    dispatch(eliminarTodo(todoId));
  };

  const toggleCheck = (todoId, isChecked) => {
    // Fix an ability to toggle task
    dispatch(modificarTodo({ todoId, isChecked }));
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {}
      <div className="todo-list-content">
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoListItem
                label={todo.label}
                onDelete={() => handleDelete(todo.id)}
                onCheck={() => toggleCheck(todo.id, todo.checked)}
                checked={todo.checked}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="no-todos">
        {todos.filter((todo) => todo.checked === false).length === 0
          ? "Looks like you're absolutely free today!"
          : ""}
      </div>
    </div>
  );
};

export default TodoList;
