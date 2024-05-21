'use client';
import { Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {AddTaskModal, TaskList }from '../components/';


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
  assignedTo: number[];
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {      
    const res = await fetch('http://127.0.0.1:8000/api/employees');
    const employees = await res.json();
      setEmployees(employees);
      console.log(employees);
    }
    
  const fetchTasks = async () => {  
    const res = await fetch('http://127.0.0.1:8000/api/tasks');
    const task = await res.json();
      setTasks(task);
  };


    useEffect(() => {
      fetchEmployees();
      fetchTasks();
    }, []);

  const handleOpenModal = (task: Task | null = null) => {
    setSelectedTask(task);
    console.log("ede",task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = async (task: Task) => {
    console.log("sadad",task);
    try {
      let url = 'http://127.0.0.1:8000/api/task/add';
      let method = 'POST';
  
      if (task.id) {
        // If task has an ID, it means we are editing an existing task
        url = `http://127.0.0.1:8000/api/task/edit/${task.id}`;
        method = 'PUT';
      }
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save task');
      }
  
      fetchTasks(); // Refresh tasks after adding or updating
    } catch (error) {
      console.error('Error saving task:', error);
    }
  
    handleCloseModal();
  };

  const handleDeleteTask = async (task:any) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/task/delete/${task.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      fetchTasks(); // Refresh tasks after deleting one
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <Container>
        <div className='joey d-flex'>
      <Typography variant="h3" gutterBottom>
        Task Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()} className='my-4'>
        Add Task
      </Button>
      <TaskList tasks={tasks} onEdit={handleOpenModal} onDelete={handleDeleteTask}/>
      <AddTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        employees={employees}
        task={selectedTask}
      />
        </div>
    </Container>
  );
};

export default HomePage;