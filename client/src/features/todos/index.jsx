import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosAsync, selectTodos } from "./todosSlice";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  console.log("Todos", todos);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  return <div>All the todos</div>;
};

export default Todos;
