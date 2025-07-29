import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { fetchPatients } from '../api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(err => console.error('Error loading patients:', err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Patients</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.PatientID}>
                <TableCell>{p.PatientID}</TableCell>
                <TableCell>{p.Name}</TableCell>
                <TableCell>{p.Age}</TableCell>
                <TableCell>{p.Gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
