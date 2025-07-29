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
