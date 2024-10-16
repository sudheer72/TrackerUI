import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import attendanceReducer from './slices/attendanceSlice';
import dailyUpdateReducer from './slices/dailyUpdateSlice';
import timesheetReducer from './slices/timesheetSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    attendance: attendanceReducer,
    dailyUpdate: dailyUpdateReducer,
    timesheet: timesheetReducer,
  },
});

export default store;
