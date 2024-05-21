import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const TaskPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TaskItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TaskInfo = styled(Box)(({ theme }) => ({
  flexGrow: 1,
}));

interface Task {
  taskName: string;
  details: string;
  assignedTo: number[];
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {

  
  return (
    <Box>
      {tasks.map((task, index) => (
        <TaskPaper key={index} elevation={3}>
          <TaskItem>
            <TaskInfo>
              <Typography variant="h6">{task.taskName}</Typography>
              <Typography variant="body1">Details: {task.details}</Typography>
            </TaskInfo>
            <Box>
              <Button variant="contained" color="primary" onClick={() => onEdit(task)} className='mx-2'>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => onDelete(task)}>
                Delete
              </Button>
            </Box>
          </TaskItem>
        </TaskPaper>
      ))}
    </Box>
  );
};

export default TaskList;