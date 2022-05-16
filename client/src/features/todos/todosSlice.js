import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// * These are our thunks, which make asynchronous calls to our server to fetch our data
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

// * Here we invoke the createSlice function, and pass it an object with all of our state details
export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    // * All our data is async so our logic does not go here, but in the extraReducers
  },
  extraReducers: (builder) => {
    // * We invoke the addCase method here to handle our thunk
    // * When our thunk is fulfilled, we can return the value as our new state
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // * This thunk adds a single todo to our database, and on sucsess, we can push the new todo
    // * into our state array
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

// * This is a function we will pass to useSelector in our component,
// * to read values from our specific slice of redux state
export const selectTodos = (state) => state.todos;

// * We need to export the reducer from our slice, and add it to our configureStore function in app/store.js
export default todosSlice.reducer;
