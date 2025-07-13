import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import Profile from './components/profile/Profile';
import AddRoom from './components/rooms/AddRoom';
import UpdateRoom from './components/rooms/UpdateRoom';
import ViewRooms from './components/rooms/ViewRooms';
import BookRoom from './components/bookings/BookRoom';
import ViewBookings from './components/bookings/ViewBookings';
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import Settings from './components/settings/Settings';
import Navbar from './components/common/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('hms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('hms_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
  };

  if (loading) {
    return (
      <div className="flex flex-center" style={{ minHeight: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <main style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          {user.role === 'admin' ? (
            <>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/rooms/add" element={<AddRoom />} />
              <Route path="/rooms/update/:id" element={<UpdateRoom />} />
              <Route path="/rooms" element={<ViewRooms />} />
              <Route path="/bookings" element={<ViewBookings />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/analytics" element={<Analytics />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<UserDashboard user={user} />} />
              <Route path="/book-room" element={<BookRoom user={user} />} />
              <Route path="/my-bookings" element={<ViewBookings user={user} />} />
            </>
          )}
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;