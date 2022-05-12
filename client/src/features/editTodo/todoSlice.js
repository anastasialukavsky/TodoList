import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleTodoAsync = createAsyncThunk(
  "todos/fetchSingleTodo",
  async (todoId) => {
    const response = await fetch(`http://localhost:8080/api/todos/${todoId}`);
    const data = await response.json();
    return data;
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodo",
  async ({ id, assignee, taskName }) => {
    const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignee,
        taskName,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTodoAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
