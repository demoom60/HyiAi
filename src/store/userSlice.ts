import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

// Define User Type
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// Define Initial State
interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return await response.json();
});

// Add User
export const addUser = createAsyncThunk("users/addUser", async (user: Omit<User, "id">) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.json();
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async (user: User) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.json();
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id: number) => {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" });
  return id;
});

// Create User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push({ ...action.payload, id: state.users.length + 1 });
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
export { fetchUsers, addUser, updateUser, deleteUser };
