import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodosAsync = createAsyncThunk("todos/fetchAll", async () => {
  const { data } = await axios.get("http://localhost:8080/api/todos");
  return data;
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async ({ assignee, taskName }) => {
    const { data } = await axios.post("http://localhost:8080/api/todos", {
      assignee,
      taskName,
    });
    return data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    // All our data is async so our logic does not go here, but in the extraReducers
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectTodos = (state) => state.todos;

export default todosSlice.reducer;
