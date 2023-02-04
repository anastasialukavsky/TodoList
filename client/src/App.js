import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllTodos from './components/AllTodos';
import SingleTodo from './components/SingleTodo';

export default function App() {
  return (
    <main className="app" id="main">
      <nav>
        <Link to="/">All Todos</Link>
        <Link to="/todos/new">Create Todo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllTodos />} />
        <Route path="/todos/new" element={<SingleTodo />} />
        <Route path="/todos/:todoId" element={<SingleTodo />} />
      </Routes>
    </main>
  );
}
