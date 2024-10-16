// src/components/DailyUpdate.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyUpdates, postDailyUpdate } from '../redux/slices/dailyUpdateSlice';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function DailyUpdate() {
  const dispatch = useDispatch();
  const { updates, status } = useSelector((state) => state.dailyUpdate);
  const [updateText, setUpdateText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDailyUpdates());
    }
  }, [status, dispatch]);

  const handleSubmit = () => {
    if (updateText.trim() === '') return;
    const newUpdate = {
      date: new Date().toISOString().split('T')[0],
      update: updateText,
    };
    dispatch(postDailyUpdate(newUpdate));
    setUpdateText('');
  };

  return (
    <Card sx={{ mb: 4 }} id="daily-update">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Daily Update
        </Typography>
        <TextField
          label="Your Update"
          multiline
          fullWidth
          rows={4}
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit Update
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          Previous Updates
        </Typography>
        <List>
          {updates.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.update} secondary={item.date} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default DailyUpdate;
