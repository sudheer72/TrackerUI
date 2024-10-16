// src/redux/slices/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async () => {
    const response = await api.get('/employee'); // Ensure this path is correct
    return response.data; // This should return the employee object
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload; // Store fetched employee data
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default employeeSlice.reducer;
