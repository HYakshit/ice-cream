import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../services/api";

const initialState = {
  owner: [],
};

// Async thunk to fetch owner data
export const fetchOwner = createAsyncThunk("owner/fetchOwner", async () => {
  const data = await apiService.getOwner();
  return data;
});

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
      })
      .addCase(fetchOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ownerSlice.reducer;