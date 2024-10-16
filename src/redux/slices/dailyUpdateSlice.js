import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchDailyUpdates = createAsyncThunk('dailyUpdate/fetchDailyUpdates', async () => {
  const response = await api.get('/dailyUpdates?_sort=date&_order=desc&_limit=5');
  return response.data;
});

export const postDailyUpdate = createAsyncThunk(
  'dailyUpdate/postDailyUpdate',
  async (update) => {
    const response = await api.post('/dailyUpdates', update);
    return response.data;
  }
);

const dailyUpdateSlice = createSlice({
  name: 'dailyUpdate',
  initialState: {
    updates: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyUpdates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyUpdates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updates = action.payload;
      })
      .addCase(fetchDailyUpdates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postDailyUpdate.fulfilled, (state, action) => {
        state.updates.unshift(action.payload);
        if (state.updates.length > 5) {
          state.updates.pop();
        }
      });
  },
});

export default dailyUpdateSlice.reducer;
