import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosAsync, selectTodos } from "./todosSlice";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  console.log("Todos", todos);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <h2>
              <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
            </h2>
            <p>assigned by {todo.assignee}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
