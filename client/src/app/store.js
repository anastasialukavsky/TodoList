import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import todoReducer from "../features/editTodo/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    todo: todoReducer,
  },
});
