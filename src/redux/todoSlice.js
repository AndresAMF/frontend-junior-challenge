import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const obtenerTodos = createAsyncThunk("todos/obtenerTodos", async () => {
  const response = await axios.get(
    "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos"
  );
  return response.data;
});

export const agregarTodo = createAsyncThunk(
  "todos/agregarTodo",
  async (todo) => {
    const response = await axios.post(
      "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos",
      todo
    );
    return response.data;
  }
);

export const modificarTodo = createAsyncThunk(
  "todos/modificarTodo",
  async ({ todoId, isChecked }) => {
    const response = await axios.patch(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`,
      { isChecked }
    );
    return response.data;
  }
);

export const eliminarTodo = createAsyncThunk(
  "todos/eliminarTodo",
  async (id) => {
    await axios.delete(
      `https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`
    );
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "none",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerTodos.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(obtenerTodos.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.items = action.payload;
        toast.success(`${state.status}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(obtenerTodos.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
        toast.error(`${state.error}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .addCase(agregarTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(modificarTodo.fulfilled, (state, action) => {
        const todoId = action.payload.id;
        const checked = action.payload.isChecked;
        const todoCheck = state.items.find((todo) => todo.id === todoId);
        if (checked === false) {
          todoCheck.checked = true;
        } else {
          todoCheck.checked = false;
        }
      })
      .addCase(eliminarTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      });
  },
});

export default todoSlice.reducer;
