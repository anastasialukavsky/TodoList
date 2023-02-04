import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSingleTodo,
  selectSingleTodo,
  editSingleTodo,
  deleteSingleTodo,
  createSingleTodo,
} from '../slices/todos/singleTodoSlice';
import { fetchAllTodos } from '../slices/todos/todosSlice';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Add conditionals to render edit versus create
 * (based on todoId existence)
 *  Submit handler logic
 *  Delete button rendering
 *  Submit button rendering
 *    'Submit Edits'
 *    'Create Task'
 * Field validation
 *  No empties (both create & edit mode)
 * Write adder reducer
 *
 *
 */

export default function SingleTodo() {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todoId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleTodo(todoId));
    setIsInvalid(false);
  }, [dispatch, todoId]);

  const singleTodo = useSelector(selectSingleTodo);

  useEffect(() => {
    setAssignee(singleTodo.assignee || '');
    setTaskName(singleTodo.taskName || '');
  }, [singleTodo]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (taskName === '' || assignee === '') {
      setIsInvalid(true);
      return;
    }
    if (todoId !== undefined) {
      dispatch(editSingleTodo({ taskName, assignee, todoId }));
    } else {
      dispatch(createSingleTodo({ taskName, assignee }));
    }
    setTaskName('');
    setAssignee('');
    setIsInvalid(false);
    await dispatch(fetchAllTodos());
    navigate('/');
  };

  const handleDelete = async (evt) => {
    console.log(evt);
    evt.preventDefault();
    setTaskName('');
    setAssignee('');
    await dispatch(deleteSingleTodo(todoId));
    await dispatch(fetchAllTodos());
    navigate('/');
  };

  function singleTodoList() {
    return (
      <form>
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          id="taskName"
          value={taskName || ''}
          name="taskName"
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        {isInvalid && taskName === '' && <p>Taskname must be entered</p>}
        <label htmlFor="assignee">Assign To:</label>
        <input
          type="text"
          id="assignee"
          value={assignee || ''}
          name="assignee"
          onChange={(e) => setAssignee(e.target.value)}
        ></input>
        {isInvalid && assignee === '' && <p>Assignee must be entered</p>}
        <button
          className={taskName === '' || assignee === '' ? 'disabled' : ''}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
        <br />
        <button onClick={handleDelete}>Delete</button>
        <br />
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    );
  }
  return <div>{singleTodoList()}</div>;
}
