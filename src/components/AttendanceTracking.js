// src/components/AttendanceTracking.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendance, updateAttendance } from '../redux/slices/attendanceSlice';
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';

function AttendanceTracking() {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.data);
  const status = useSelector((state) => state.attendance.status);
  const error = useSelector((state) => state.attendance.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAttendance());
    }
    console.log('Current Attendance State:', attendance);
  }, [status, dispatch, attendance]);

  const handleClockInOut = () => {
    dispatch(updateAttendance());
  };

  // Format totalHours to display "Total Hours Today: X.XX"
  const formatTotalHours = (hours) => {
    if (hours === null || hours === undefined) return '0.00';
    return hours.toFixed(2);
  };

  return (
    <Card sx={{ mb: 4 }} id="clock-in-out">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Tracking
        </Typography>
        {status === 'loading' ? (
          <CircularProgress />
        ) : status === 'failed' ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Status: {attendance.status === 'in' ? 'Clocked In' : 'Clocked Out'}
              </Typography>
              {attendance.status === 'in' && attendance.clockInTime && (
                <Typography variant="body2">
                  Clock In Time: {new Date(attendance.clockInTime).toLocaleTimeString()}
                </Typography>
              )}
              {attendance.status === 'out' && attendance.clockOutTime && (
                <Typography variant="body2">
                  Clock Out Time: {new Date(attendance.clockOutTime).toLocaleTimeString()}
                </Typography>
              )}
              <Typography variant="body1" sx={{ mt: 1 }}>
                Total Hours Today: {formatTotalHours(attendance.totalHours)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleClockInOut}>
                {attendance.status === 'in' ? 'Clock Out' : 'Clock In'}
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default AttendanceTracking;
