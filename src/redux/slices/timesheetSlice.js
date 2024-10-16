import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTimesheet = createAsyncThunk('timesheet/fetchTimesheet', async () => {
  const response = await api.get('/timesheet');
  return response.data;
});

export const postTimesheet = createAsyncThunk(
  'timesheet/postTimesheet',
  async (timesheetEntry) => {
    const response = await api.post('/timesheet', timesheetEntry);
    return response.data;
  }
);

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState: {
    entries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimesheet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTimesheet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchTimesheet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postTimesheet.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      });
  },
});

export default timesheetSlice.reducer;
