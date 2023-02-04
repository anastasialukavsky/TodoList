import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleTodo = createAsyncThunk(
  "singleTodo/fetchSingleTodo",
  async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/todos/${id}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(`Trouble fetching todo ${id}`);
    }
  }
);

export const editSingleTodo = createAsyncThunk(
  "singleTodo/editSingleTodo",
  async ({ taskName, todoId, assignee }) => {
    try {
      const { data } = await axios.put(`/api/todos/${todoId}`, {
        taskName,
        assignee,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleTodoSlice = createSlice({
  name: "singleTodo",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTodo.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(editSingleTodo.fulfilled, (state, { payload }) => {
        return payload;
      });
  },
});

export const selectSingleTodo = (state) => state.singleTodo;
export default singleTodoSlice.reducer;
