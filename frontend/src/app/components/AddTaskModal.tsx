// components/AddTaskModal.tsx
'use client';
// components/AddTaskModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: theme.spacing(2, 4, 3),
  width: 400,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', 
}));

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface Task {
  id?: number;
  taskName: string;
  details: string;
  assignedTo: number[]; // Change to array of numbers
}

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  employees: Employee[];
  task?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, employees, onSave, task }) => {
  const [taskName, setTaskName] = useState('');
  const [details, setDetails] = useState('');
  const [assignedTo, setAssignedTo] = useState<number[]>([]);
  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setDetails(task.details);
      setAssignedTo(employees.filter(employee => task.assignedTo.includes(employee.id)).map(employee => employee.id));
    } else {
      setTaskName('');
      setDetails('');
      setAssignedTo([]);
    }
  }, [task]);

  const handleSave = () => {
    if (!taskName || !details || assignedTo.length === 0) { // Check if assignedTo array is empty
      alert('Please fill in all fields');
      return;
    }

    onSave({
      id: task?.id,
      taskName,
      details,
      assignedTo,
    });

    setTaskName('');
    setDetails('');
    setAssignedTo([]);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-task-modal"
      aria-describedby="add-task-modal-description"
    >
      <ModalBox>
        <Typography variant="h6" id="add-task-modal" style={{ color: 'black' }}>
          {task?.id ? 'Edit Task' : 'Add Task'}
        </Typography>
        <form>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            label="Details"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="assigned-to-label">Assigned To</InputLabel>
            <Select
              labelId="assigned-to-label"
              multiple // Enable multiple selection
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value as number[])} // Cast to number[]
              label="Assigned To"
              fullWidth
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.firstname} {employee.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default AddTaskModal;
