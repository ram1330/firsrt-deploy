import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTodos = createAsyncThunk("todos/getTodos", async () => {
  const { data } = await axios.get("http://localhost:8000/todos");
  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const { data } = await axios.post("http://localhost:8000/todos", newTodo);
  return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`http://localhost:8000/todos/${id}`);
  return id;
});

export const editTodo = createAsyncThunk("todos/editTodo", async (todo) => {
  const { data } = await axios.patch(
    `http://localhost:8000/todos/${todo.id}`,
    todo
  );
  return data;
});

const initialState = {
  todos: [],
  status: "",
};

const todosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get todos
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.status = "success";
      state.todos = action.payload;
    });
    builder.addCase(getAllTodos.rejected, (state) => {
      state.status = "error";
      console.log(state.status);
    });

    // add todo
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = "success added";
      state.todos.push(action.payload);
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.status = "error add";
      console.log(state.status);
    });

    // delete todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = "success deleted";
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.status = "error delete";
    });

    // edit todo
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.status = "success edited";
      state.todos = state.todos.map((el) =>
        action.payload.id === el.id ? action.payload : el
      );
    });
    builder.addCase(editTodo.rejected, (state) => {
      state.status = "error edit";
      console.log(state.status);
    });
  },
});

export default todosSlice.reducer;
