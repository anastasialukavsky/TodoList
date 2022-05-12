import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Todos from "./features/todos";
import EditTodo from "./features/editTodo";
import CreateTodo from "./features/createTodo";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">All Todos</Link>
        <Link to="/createTodo">Create a Todo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/createTodo" element={<CreateTodo />} />
        <Route path="/todos/:id" element={<EditTodo />} />
      </Routes>
    </div>
  );
}

export default App;
