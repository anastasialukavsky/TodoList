import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AllTodos from "./components/AllTodos";
import SingleTodo from "./components/SingleTodo";

export default function App() {
  return (
    <main className="app" id="main">
      <nav>
        <Link to="/">All Todos</Link>
        <p>Create Todo</p>
      </nav>
      <Routes>
        <Route path="/" element={<AllTodos />} />
        <Route path="/todos/:todoId" element={<SingleTodo />} />
      </Routes>
    </main>
  );
}
