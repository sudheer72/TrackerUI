import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import AttendanceTracking from './components/AttendanceTracking';
import DailyUpdate from './components/DailyUpdate';
import Timesheet from './components/Timesheet';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import backgroundImage from './assets/background.jpg';
import './styles.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
  },
});

const appStyles = {
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const containerStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: 4,
  borderRadius: 2,
  maxWidth: '1200px',
  margin: '0 auto',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={appStyles}>
        <Container sx={containerStyles}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Baari Labs Employee Tracker
          </Typography>
          <Dashboard />
          <AttendanceTracking />
          <DailyUpdate />
          <Timesheet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
