import React, { useEffect, useState } from 'react';
import { fetchPatients, addPatient } from '../api';
import {
  Container, Typography, Button, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });

  const loadPatients = async () => {
    const data = await fetchPatients();
    setPatients(data.map((p, i) => ({ id: p.PatientID || i, ...p })));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAdd = async () => {
    await addPatient(newPatient);
    setOpen(false);
    setNewPatient({ name: '', age: '', gender: '' });
    loadPatients();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Patients</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Patient</Button>

      <div style={{ height: 400, marginTop: 16 }}>
        <DataGrid
          rows={patients}
          columns={[
            { field: 'PatientID', headerName: 'ID', width: 90 },
            { field: 'Name', headerName: 'Name', width: 150 },
            { field: 'Age', headerName: 'Age', width: 100 },
            { field: 'Gender', headerName: 'Gender', width: 120 },
          ]}
          pageSize={5}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Patient</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" fullWidth
            value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
          <TextField margin="dense" label="Age" type="number" fullWidth
            value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
          <TextField margin="dense" label="Gender" fullWidth
            value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
