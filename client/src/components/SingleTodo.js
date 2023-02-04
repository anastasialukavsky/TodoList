import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleTodo,
  selectSingleTodo,
  editSingleTodo,
} from "../slices/todos/singleTodoSlice";
import { fetchAllTodos } from "../slices/todos/todosSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleTodo() {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todoId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleTodo(todoId));
  }, [dispatch, todoId]);

  const singleTodo = useSelector(selectSingleTodo);

  useEffect(() => {
    setAssignee(singleTodo.assignee);
    setTaskName(singleTodo.taskName);
  }, [singleTodo]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(editSingleTodo({ taskName, assignee, todoId }));
    setTaskName("");
    setAssignee("");
    await dispatch(fetchAllTodos());
    navigate("/");
  };
  function singleTodoList() {
    return (
      <form>
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          id="taskName"
          value={taskName || ""}
          name="taskName"
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        <label htmlFor="assignee">Assign To:</label>
        <input
          type="text"
          id="assignee"
          value={assignee || ""}
          name="assignee"
          onChange={(e) => setAssignee(e.target.value)}
        ></input>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
        <br />
        <button>Delete</button>
        <br />
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    );
  }
  return <div>{singleTodoList()}</div>;
}
