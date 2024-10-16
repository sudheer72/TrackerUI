import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async () => {
    const response = await api.get('/attendance');
    return response.data[0];
  }
);

export const updateAttendance = createAsyncThunk(
  'attendance/updateAttendance',
  async (_, { getState }) => {
    const state = getState();
    const currentAttendance = state.attendance.data;

    const now = new Date().toISOString();

    let updatedData = {};

    if (currentAttendance.status === 'out') {
      updatedData = {
        ...currentAttendance,
        status: 'in',
        clockInTime: now,
        clockOutTime: null,
        totalHours: 0,
      };
    } else {
      const clockInTime = new Date(currentAttendance.clockInTime);
      const clockOutTime = new Date(now);
      const diffMs = clockOutTime - clockInTime; 
      const diffHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100; 

      updatedData = {
        ...currentAttendance,
        status: 'out',
        clockOutTime: now,
        totalHours: diffHours,
      };
    }

    console.log('Updating Attendance with:', updatedData);

    const response = await api.put(`/attendance/1`, updatedData);

    console.log('Response from API:', response.data);

    return response.data;
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateAttendance.pending, (state) => {
        state.status = 'updating';
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
