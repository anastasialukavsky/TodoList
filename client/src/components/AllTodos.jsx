import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodos, selectAllTodos } from "../slices/todos/todosSlice";
import {
  createSingleTodo,
  selectSingleTodo,
} from "../slices/todos/singleTodoSlice";

export default function AllTodos(props) {
  const dispatch = useDispatch();
  const allTodos = useSelector(selectAllTodos);
  const singleTodo = useSelector(selectSingleTodo);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch, singleTodo]);


  function todosList() {
    if (allTodos.length > 0)
      return allTodos.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <li>
              <Link to={`/todos/${todo.id}`}>{todo.taskName}</Link>
              <p>Assigned by: {todo.assignee}</p>
            </li>
          </React.Fragment>
        );
      });
  }

  function FormView() {
    const [taskName, setTaskName] = useState("");
    const [assignee, setAssignee] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!taskName || !assignee) {
        setIsInvalid(true);
        return;
      }
      setTaskName("");
      setAssignee("");
      dispatch(createSingleTodo({ taskName, assignee }));
    };
    const handleDelete = (event) => {
      event.preventDefault();
      setTaskName("");
      setAssignee("");
    };

    return (
      <form className="main-view-form">
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="taskName"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        {isInvalid && taskName === "" && <p>Must enter the task</p>}

        <label htmlFor="assignee">Assign To:</label>
        <input
          type="text"
          name="assignee"
          id="assignee"
          value={assignee}
          onChange={(event) => setAssignee(event.target.value)}
        />
        {isInvalid && assignee === "" && <p>Must enter your assignee name</p>}
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <button onClick={handleDelete}>Delete</button>
      </form>
    );
  }

  return (
    <div>
      <ul>{todosList()}</ul>
      <ul>{FormView()}</ul>
    </div>
  );
}
