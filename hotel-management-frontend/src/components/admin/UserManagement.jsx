import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Trash2, Eye } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import '../../styles/Forms.css';
import '../../styles/Cards.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterRole) {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole]);

  const loadUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/users');
      // const usersData = await response.json();
      
      const usersData = mockUsers.filter(u => u.role !== 'admin');
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (loading) {
    return (
      <div className="form-container">
        <div className="container text-center">
          <div>Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-header">
          <h1 className="form-title">User Management</h1>
          <p className="form-description">Manage user accounts and permissions</p>
        </div>

        {/* Search and Filters */}
        <div className="filter-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-row">
            <div className="form-group">
              <label className="form-label">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="form-select"
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterRole('');
                }}
                className="btn btn-secondary"
                style={{ marginTop: '26px' }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="text-center p-32">
              <p>No users found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-2">
              {filteredUsers.map((user) => (
                <div key={user.id} className="user-card card">
                  <div className="user-header">
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                    <div>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: user.role === 'admin' ? '#FF6B6B20' : '#4ECDC420',
                          color: user.role === 'admin' ? '#FF6B6B' : '#4ECDC4',
                          textTransform: 'capitalize'
                        }}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="user-stats">
                    <div className="stat-item">
                      <div className="stat-value">5</div>
                      <div className="stat-label">Bookings</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">$1,250</div>
                      <div className="stat-label">Total Spent</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">Gold</div>
                      <div className="stat-label">Status</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button
                      onClick={() => handleViewUser(user)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '8px', fontSize: '14px' }}
                    >
                      <Eye size={16} style={{ marginRight: '4px' }} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-danger"
                      style={{ padding: '8px 12px', fontSize: '14px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>User Details</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>{selectedUser.name}</h3>
                
                <div style={{ marginBottom: '12px' }}>
                  <strong>Email:</strong> {selectedUser.email}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Phone:</strong> {selectedUser.phone}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{selectedUser.role}</span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Member Since:</strong> January 2024
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Last Login:</strong> 2 days ago
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Booking History</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p>Total Bookings: 5</p>
                  <p>Total Spent: $1,250</p>
                  <p>Favorite Room Type: Deluxe</p>
                  <p>Average Stay: 2.4 nights</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setShowUserModal(false);
                  }}
                  className="btn btn-danger"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;