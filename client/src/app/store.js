import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todos/todosSlice";
import singleTodoReducer from "../slices/todos/singleTodoSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    singleTodo: singleTodoReducer,
  },
});
