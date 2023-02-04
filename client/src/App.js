import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllTodos from './components/AllTodos';

export default function App(props) {
  return (
    <main className="app" id="main">
      <nav>
        <Link to="/">All Todos</Link>
        <p>Create Todo</p>
      </nav>
      <Routes>
        <Route path="/" element={<AllTodos />} />
      </Routes>
    </main>
  );
}
