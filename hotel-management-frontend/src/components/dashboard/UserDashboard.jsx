import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, User, Settings, Bed, Clock, MapPin } from 'lucide-react';
import { fetchBookings } from '../../data/mockData';
import '../../styles/Dashboard.css';

const UserDashboard = ({ user }) => {
  const [userBookings, setUserBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchUserBookings(user.id).then(bookings => { ... });
    
    fetchBookings(user.id).then(bookings => {
      setUserBookings(bookings);
      
      const upcoming = bookings.filter(b => 
        new Date(b.checkIn) > new Date() && b.status === 'confirmed'
      ).length;
      
      const totalSpent = bookings.reduce((sum, b) => sum + b.totalCost, 0);
      
      setStats({
        totalBookings: bookings.length,
        upcomingBookings: upcoming,
        totalSpent
      });
    });
  }, [user.id]);

  const quickActions = [
    {
      title: 'Book a Room',
      description: 'Find and reserve your perfect room',
      icon: <Bed size={24} />,
      link: '/book-room',
      color: 'primary'
    },
    {
      title: 'My Bookings',
      description: 'View your reservation history',
      icon: <Calendar size={24} />,
      link: '/my-bookings',
      color: 'secondary'
    },
    {
      title: 'Update Profile',
      description: 'Manage your account details',
      icon: <User size={24} />,
      link: '/profile',
      color: 'accent'
    },
    {
      title: 'Settings',
      description: 'Customize your preferences',
      icon: <Settings size={24} />,
      link: '/settings',
      color: 'success'
    }
  ];

  const upcomingBookings = userBookings.filter(b => 
    new Date(b.checkIn) > new Date() && b.status === 'confirmed'
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
          <p className="dashboard-subtitle">Manage your bookings and explore our hotel services.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Link to="/my-bookings" className="stat-card card bookings">
            <div className="stat-header">
              <span className="stat-title">Total Bookings</span>
              <Calendar size={24} />
            </div>
            <div className="stat-value">{stats.totalBookings}</div>
          </Link>

          <Link to="/my-bookings" className="stat-card card stays">
            <div className="stat-header">
              <span className="stat-title">Upcoming Stays</span>
              <Clock size={24} />
            </div>
            <div className="stat-value">{stats.upcomingBookings}</div>
          </Link>

          <Link to="/my-bookings" className="stat-card card revenue">
            <div className="stat-header">
              <span className="stat-title">Total Spent</span>
              <CreditCard size={24} />
            </div>
            <div className="stat-value">${stats.totalSpent}</div>
          </Link>

          <Link to="/profile" className="stat-card card loyalty">
            <div className="stat-header">
              <span className="stat-title">Loyalty Status</span>
              <User size={24} />
            </div>
            <div className="stat-value">Gold</div>
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
                <button className="btn btn-primary">Continue</button>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <div className="recent-section">
            <div className="recent-card card">
              <div className="recent-header">
                <h3 className="recent-title">Upcoming Bookings</h3>
                <Link to="/my-bookings" className="btn btn-secondary">View All</Link>
              </div>
              <ul className="recent-list">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <li key={booking.id} className="recent-item">
                    <div className="recent-info">
                      <h4>{booking.roomName}</h4>
                      <p>{booking.checkIn} - {booking.checkOut}</p>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <MapPin size={14} style={{ marginRight: '4px', color: '#666' }} />
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="recent-meta">
                      <div className="recent-amount">${booking.totalCost}</div>
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
                <h3 className="recent-title">Account Summary</h3>
              </div>
              <div className="account-summary">
                <div className="summary-item">
                  <div className="summary-label">Member Since</div>
                  <div className="summary-value">January 2024</div>
                </div>
                <div className="summary-item" style={{ marginTop: '16px' }}>
                  <div className="summary-label">Favorite Room Type</div>
                  <div className="summary-value">Deluxe</div>
                </div>
                <div className="summary-item" style={{ marginTop: '16px' }}>
                  <div className="summary-label">Points Balance</div>
                  <div className="summary-value">2,450 pts</div>
                </div>
                <div className="summary-item" style={{ marginTop: '16px' }}>
                  <div className="summary-label">Next Reward</div>
                  <div className="summary-value">Free Night (3,000 pts)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;