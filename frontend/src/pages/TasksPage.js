import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress
} from '@mui/material';

import { fetchTasks, completeTask } from '../api';

export default function TasksPage({ patientId = 1 }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks(patientId);
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [patientId]);

  const handleComplete = async (taskId) => {
    try {
      await completeTask(taskId);
      await loadTasks();
    } catch (err) {
      console.error('Failed to complete task:', err.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Oncology Task Automation
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.TaskID}>
                  <TableCell>{task.TaskName}</TableCell>
                  <TableCell>{task.Status}</TableCell>
                  <TableCell>{task.CreatedAt?.slice(0, 10)}</TableCell>
                  <TableCell>
                    {task.Status === 'Pending' && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleComplete(task.TaskID)}
                      >
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
