import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../todos/todosSlice";

const CreateTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addTodoAsync({ taskName, assignee }));
  };

  return (
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

      <button type="submit">Submit</button>
      <Link to="/">Cancel</Link>
    </form>
  );
};

export default CreateTodo;
