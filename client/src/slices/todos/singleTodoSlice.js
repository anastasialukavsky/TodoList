import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSingleTodo = createAsyncThunk(
  'singleTodo/fetchSingleTodo',
  async (id) => {
    if (id === undefined) return {};
    try {
      const { data } = await axios.get(`http://localhost:8080/api/todos/${id}`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(`Trouble fetching todo ${id}`);
    }
  }
);

export const createSingleTodo = createAsyncThunk(
  'singleTodo/createSingleTodo',
  async ({ taskName, assignee }) => {
    try {
      const { data } = await axios.post('/api/todos', { taskName, assignee });
      return data;
    } catch (err) {
      console.error('Trouble creating new Todo:', err.message);
    }
  }
);

export const editSingleTodo = createAsyncThunk(
  'singleTodo/editSingleTodo',
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

export const deleteSingleTodo = createAsyncThunk(
  'singleTodo/deleteSingleTodo',
  async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
    } catch (err) {
      console.error('Trouble deleting single todo', err.message);
    }
  }
);

const singleTodoSlice = createSlice({
  name: 'singleTodo',
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTodo.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(editSingleTodo.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(deleteSingleTodo.fulfilled, (state, { payload }) => {
        return {};
      })
      .addCase(createSingleTodo.fulfilled, (state, { payload }) => {
        return { payload };
      });
  },
});

export const selectSingleTodo = (state) => state.singleTodo;
export default singleTodoSlice.reducer;
