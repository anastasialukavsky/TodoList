import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * THUNKS
 */

const fetchAllTodos = createAsyncThunk('todos/fetchAllTodos', async () => {
  try {
    const { data } = await axios.get('/api/todos');
    return data;
  } catch (err) {
    console.log('Error at fetchAllTodos:', err.message);
  }
});

/**
 * SLICE
 */

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

/**
 * GETTERS
 */

function selectAllTodos(state) {
  return state.todos;
}

export { fetchAllTodos, selectAllTodos };

export default todosSlice.reducer;
