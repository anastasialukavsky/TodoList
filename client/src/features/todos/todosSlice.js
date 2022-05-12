import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodosAsync = createAsyncThunk("todos/fetchAll", async () => {
  const response = await fetch("http://localhost:8080/api/todos");
  const data = await response.json();
  return data;
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async ({ assignee, taskName }) => {
    const response = await fetch("http://localhost:8080/api/todos", {
      method: "POST",
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

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    // All our data is async so our logic does not go here
    // addTodo: (state, action) => {
    //   state.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      const newState = state.filter((todo) => todo.id !== action.payload.id);
      return newState;
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      const newState = state.map((todo) => {
        if ((todo.id = action.payload.id)) {
          return action.payload;
        }
        return todo;
      });
      return newState;
    });
  },
});

// Not needed as we are using extraBuilders
// export const { addTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos;

export default todosSlice.reducer;
