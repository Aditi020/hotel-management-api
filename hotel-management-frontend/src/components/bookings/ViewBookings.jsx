import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin, CreditCard, X } from 'lucide-react';
import { fetchBookings } from '../../data/mockData';
import '../../styles/Forms.css';
import '../../styles/Cards.css';

const ViewBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('bookingDate');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadBookings();
  }, [user]);

  useEffect(() => {
    let filtered = bookings;

    if (filterStatus) {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    // Sort bookings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'checkIn':
          return new Date(a.checkIn) - new Date(b.checkIn);
        case 'totalCost':
          return b.totalCost - a.totalCost;
        default:
          return new Date(b.bookingDate) - new Date(a.bookingDate);
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, sortBy]);

  const loadBookings = async () => {
    try {
      const bookingsData = await fetchBookings(isAdmin ? null : user.id);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
        
        setBookings(bookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        ));
      } catch (error) {
        console.error('Failed to cancel booking:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <div className="container text-center">
          <div>Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-header">
          <h1 className="form-title">
            {isAdmin ? 'All Bookings' : 'My Bookings'}
          </h1>
          <p className="form-description">
            {isAdmin ? 'Manage all hotel reservations' : 'View and manage your reservations'}
          </p>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="filter-row">
            <div className="form-group">
              <label className="form-label">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
              >
                <option value="">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="bookingDate">Booking Date</option>
                <option value="checkIn">Check-in Date</option>
                <option value="totalCost">Total Cost</option>
              </select>
            </div>

            <div className="form-group">
              <button
                onClick={() => {
                  setFilterStatus('');
                  setSortBy('bookingDate');
                }}
                className="btn btn-secondary"
                style={{ marginTop: '26px' }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="text-center p-32">
              <p>No bookings found.</p>
            </div>
          ) : (
            <div className="grid">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-card card">
                  <div className="booking-header">
                    <div className="booking-info">
                      {isAdmin && (
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <User size={16} style={{ marginRight: '8px', color: '#666' }} />
                          <span style={{ fontWeight: '600', color: '#333' }}>{booking.userName}</span>
                        </div>
                      )}
                      <h3>{booking.roomName}</h3>
                      <p>Booking #{booking.id}</p>
                      <p style={{ fontSize: '12px', color: '#999' }}>
                        Booked on {booking.bookingDate}
                      </p>
                    </div>
                    <div>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: `${getStatusColor(booking.status)}20`,
                          color: getStatusColor(booking.status),
                          border: `1px solid ${getStatusColor(booking.status)}40`
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="booking-dates">
                    <div className="date-group">
                      <div className="date-label">Check-in</div>
                      <div className="date-value">{booking.checkIn}</div>
                    </div>
                    <div className="date-group">
                      <div className="date-label">Check-out</div>
                      <div className="date-value">{booking.checkOut}</div>
                    </div>
                    <div className="date-group">
                      <div className="date-label">Guests</div>
                      <div className="date-value">{booking.guests}</div>
                    </div>
                  </div>

                  <div className="flex-between" style={{ marginTop: '16px' }}>
                    <div className="booking-total">
                      ${booking.totalCost}
                    </div>
                    
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn btn-danger"
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                      >
                        <X size={16} style={{ marginRight: '4px' }} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;