import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../redux/slices/employeeSlice';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchAttendance } from '../redux/slices/attendanceSlice';
import dashboardBackground from '../assets/background.jpg'; 
import './Dashboard.css';
const dashboardStyles = {
  backgroundImage: `url(${dashboardBackground})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: 2,
  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
};

function Dashboard() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.data);
  const attendance = useSelector((state) => state.attendance.data);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchAttendance());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <Card sx={dashboardStyles}>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="white"> 
              Current Date and Time
            </Typography>
            <Typography variant="body1" color="white">
              {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }} color="white">
              Employee Information
            </Typography>
            <Typography variant="body1" color="white">Name: Jane Smith {employee.name}</Typography>
            <Typography variant="body1" color="white">Email: jane.smith@baarilabs.com{employee.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" href="#clock-in-out">
                Clock In/Out
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" href="#daily-update">
                Daily Update
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" href="#timesheet">
                Timesheet
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
