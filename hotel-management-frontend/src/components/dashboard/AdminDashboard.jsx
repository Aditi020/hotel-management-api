import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Calendar, BarChart3, Settings, Bed, DollarSign, TrendingUp, UserCheck } from 'lucide-react';
import { mockBookings, mockRooms, mockUsers, mockAnalytics } from '../../data/mockData';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchStats().then(setStats);
    // fetchRecentBookings().then(setRecentBookings);
    
    setStats({
      totalRooms: mockRooms.length,
      totalBookings: mockBookings.length,
      totalUsers: mockUsers.filter(u => u.role === 'user').length,
      totalRevenue: mockAnalytics.totalRevenue
    });
    
    setRecentBookings(mockBookings.slice(0, 5));
  }, []);

  const quickActions = [
    {
      title: 'Add New Room',
      description: 'Create a new room listing',
      icon: <Plus size={24} />,
      link: '/rooms/add',
      color: 'primary'
    },
    {
      title: 'Manage Bookings',
      description: 'View and manage reservations',
      icon: <Calendar size={24} />,
      link: '/bookings',
      color: 'secondary'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts',
      icon: <Users size={24} />,
      link: '/users',
      color: 'accent'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: <BarChart3 size={24} />,
      link: '/analytics',
      color: 'success'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening at your hotel.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Link to="/rooms" className="stat-card card rooms">
            <div className="stat-header">
              <span className="stat-title">Total Rooms</span>
              <Bed size={24} />
            </div>
            <div className="stat-value">{stats.totalRooms}</div>
          </Link>

          <Link to="/bookings" className="stat-card card bookings">
            <div className="stat-header">
              <span className="stat-title">Total Bookings</span>
              <Calendar size={24} />
            </div>
            <div className="stat-value">{stats.totalBookings}</div>
          </Link>

          <Link to="/users" className="stat-card card users">
            <div className="stat-header">
              <span className="stat-title">Active Users</span>
              <UserCheck size={24} />
            </div>
            <div className="stat-value">{stats.totalUsers}</div>
          </Link>

          <Link to="/analytics" className="stat-card card revenue">
            <div className="stat-header">
              <span className="stat-title">Total Revenue</span>
              <DollarSign size={24} />
            </div>
            <div className="stat-value">${stats.totalRevenue?.toLocaleString()}</div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <Link to={action.link} key={index} className="action-card card">
                <div className="action-icon">
                  {action.icon}
                </div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
                <button className="btn btn-primary">Get Started</button>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-section">
          <div className="recent-card card">
            <div className="recent-header">
              <h3 className="recent-title">Recent Bookings</h3>
              <Link to="/bookings" className="btn btn-secondary">View All</Link>
            </div>
            <ul className="recent-list">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="recent-item">
                  <div className="recent-info">
                    <h4>{booking.userName}</h4>
                    <p>{booking.roomName}</p>
                  </div>
                  <div className="recent-meta">
                    <div className="recent-amount">${booking.totalCost}</div>
                    <div className="recent-date">{booking.checkIn}</div>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="recent-card card">
            <div className="recent-header">
              <h3 className="recent-title">Performance Overview</h3>
              <Link to="/analytics" className="btn btn-secondary">View Analytics</Link>
            </div>
            <div className="performance-metrics">
              <div className="metric-item">
                <div className="metric-label">Occupancy Rate</div>
                <div className="metric-value">{mockAnalytics.occupancyRate}%</div>
                <div className="metric-trend">
                  <TrendingUp size={16} color="#4CAF50" />
                  <span style={{ color: '#4CAF50', fontSize: '14px' }}>+5% vs last month</span>
                </div>
              </div>
              <div className="metric-item" style={{ marginTop: '16px' }}>
                <div className="metric-label">Average Stay</div>
                <div className="metric-value">{mockAnalytics.averageStay} days</div>
                <div className="metric-trend">
                  <TrendingUp size={16} color="#4CAF50" />
                  <span style={{ color: '#4CAF50', fontSize: '14px' }}>+0.2 vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;