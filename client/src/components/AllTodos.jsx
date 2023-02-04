import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTodos, selectAllTodos } from '../slices/todos/todosSlice';

export default function AllTodos(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const allTodos = useSelector(selectAllTodos);

  function todosList() {
    if (allTodos.length > 0)
      return allTodos.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <li>
              <Link to={`/${todo.id}`}>{todo.taskName}</Link>
              <p>Assigned by: {todo.assignee}</p>
            </li>
          </React.Fragment>
        );
      });
  }

  return (
    <div>
      <ul>{todosList()}</ul>
    </div>
  );
}
