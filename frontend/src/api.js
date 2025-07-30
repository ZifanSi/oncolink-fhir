const API = 'http://localhost:5000/api';

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function fetchPatients() {
  const res = await fetch(`${API}/patients`);
  if (!res.ok) throw new Error('Failed to fetch patients');
  return await res.json();
}

export async function addPatient(patient) {
  const res = await fetch(`${API}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient)
  });
  if (!res.ok) throw new Error('Failed to add patient');
}

export async function deletePatient(id) {
  const res = await fetch(`${API}/patients/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete patient');
}

export async function updatePatient(id, patient) {
  const res = await fetch(`${API}/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient)
  });
  if (!res.ok) throw new Error('Failed to update patient');
}
