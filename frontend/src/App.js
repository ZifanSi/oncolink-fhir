import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import PatientsPage from './pages/PatientsPage';
import NavBar from './components/NavBar';
import RequireAuth from './components/RequireAuth';


const isLoggedIn = () => localStorage.getItem('loggedIn') === 'true';

function AppLayout() {
  const location = useLocation();
  const showNav = isLoggedIn() && location.pathname !== '/login';

  return (
    <>
      {showNav && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/menu" element={
          <RequireAuth><MenuPage /></RequireAuth>
        } />
        <Route path="/patients" element={
          <RequireAuth><PatientsPage /></RequireAuth>
        } />
        {/* fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
