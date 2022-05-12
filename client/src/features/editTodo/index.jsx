import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchSingleTodoAsync,
  selectTodo,
  editTodoAsync,
  deleteTodoAsync,
} from "./todoSlice";

const EditTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  console.log("single todo:", todo);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleTodoAsync(id));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(editTodoAsync({ id, taskName, assignee }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <>
      <li key={todo.id}>
        <h2>
          <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
        </h2>
        <p>assigned by {todo.assignee}</p>
      </li>
      <form id="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label htmlFor="assignee">Assign To:</label>
        <input
          name="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />

        <button type="submit">Edit</button>

        <Link to="/">Cancel</Link>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default EditTodo;
