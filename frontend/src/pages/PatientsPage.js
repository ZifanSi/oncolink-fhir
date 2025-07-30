import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import {
  fetchPatients, addPatient, deletePatient, updatePatient
} from '../api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    phone: '', email: '', sin: ''
  });

  const load = async () => {
    const data = await fetchPatients();
    setPatients(data);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (editing) {
      await updatePatient(editing.PatientID, form);
    } else {
      await addPatient(form);
    }
    setOpen(false);
    setEditing(null);
    setForm({
      firstName: '', lastName: '', dob: '', gender: '',
      phone: '', email: '', sin: ''
    });
    load();
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      firstName: p.FirstName,
      lastName: p.LastName,
      dob: p.DOB?.slice(0, 10), // yyyy-mm-dd format
      gender: p.Gender,
      phone: p.Phone || '',
      email: p.Email || '',
      sin: p.SIN || ''
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    load();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Patients</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => {
        setEditing(null);
        setForm({
          firstName: '', lastName: '', dob: '', gender: '',
          phone: '', email: '', sin: ''
        });
        setOpen(true);
      }}>
        Add Patient
      </Button>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>SIN</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.PatientID}>
                <TableCell>{p.PatientID}</TableCell>
                <TableCell>{p.FirstName}</TableCell>
                <TableCell>{p.LastName}</TableCell>
                <TableCell>{p.DOB?.slice(0, 10)}</TableCell>
                <TableCell>{p.Gender}</TableCell>
                <TableCell>{p.Phone}</TableCell>
                <TableCell>{p.Email}</TableCell>
                <TableCell>{p.SIN}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(p)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(p.PatientID)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? 'Edit' : 'Add'} Patient</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="First Name" margin="dense" value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })} />
          <TextField fullWidth label="Last Name" margin="dense" value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })} />
          <TextField fullWidth label="Date of Birth" margin="dense" type="date"
            value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })}
            InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Gender" margin="dense" value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })} />
          <TextField fullWidth label="Phone" margin="dense" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} />
          <TextField fullWidth label="Email" margin="dense" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="SIN" margin="dense" value={form.sin}
            onChange={e => setForm({ ...form, sin: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
