// src/components/Timesheet.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimesheet, postTimesheet } from '../redux/slices/timesheetSlice';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function Timesheet() {
  const dispatch = useDispatch();
  const { entries, status } = useSelector((state) => state.timesheet);
  const [date, setDate] = useState('');
  const [projects, setProjects] = useState([{ name: '', hours: '' }]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTimesheet());
    }
  }, [status, dispatch]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', hours: '' }]);
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = () => {
    if (date === '' || projects.some((p) => p.name === '' || p.hours === '')) return;
    const newEntry = {
      date,
      projects: projects.map((p) => ({ name: p.name, hours: Number(p.hours) })),
    };
    dispatch(postTimesheet(newEntry));
    setDate('');
    setProjects([{ name: '', hours: '' }]);
  };

  return (
    <Card sx={{ mb: 4 }} id="timesheet">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Timesheet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Project Name"
                  fullWidth
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={10} sm={3}>
                <TextField
                  label="Hours"
                  type="number"
                  fullWidth
                  value={project.hours}
                  onChange={(e) => handleProjectChange(index, 'hours', e.target.value)}
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton color="error" onClick={() => removeProject(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" startIcon={<Add />} onClick={addProject}>
              Add Project
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Timesheet
            </Button>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          Timesheet Entries
        </Typography>
        <List>
          {entries.map((entry) => (
            <ListItem key={entry.id}>
              <ListItemText
                primary={`Date: ${entry.date}`}
                secondary={
                  <ul>
                    {entry.projects.map((project, idx) => (
                      <li key={idx}>
                        {project.name}: {project.hours} hours
                      </li>
                    ))}
                  </ul>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default Timesheet;
