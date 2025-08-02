const AUTH_API = 'http://localhost:5001/api';
const PATIENT_API = 'http://localhost:5002/api';

async function request(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
}

// ───── Auth API ─────
export async function login(username, password) {
  return request(`${AUTH_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
}

// ───── Patient API ─────
export async function fetchPatients() {
  return request(`${PATIENT_API}/patients`);
}

export async function addPatient(patient) {
  return request(`${PATIENT_API}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient)
  });
}

export async function deletePatient(id) {
  return request(`${PATIENT_API}/patients/${id}`, {
    method: 'DELETE'
  });
}

export async function updatePatient(id, patient) {
  return request(`${PATIENT_API}/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient)
  });
}
