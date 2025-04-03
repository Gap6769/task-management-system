import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

const TaskList = ({ tasks }) => {
  return (
    <Paper elevation={3}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={`Status: ${task.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;