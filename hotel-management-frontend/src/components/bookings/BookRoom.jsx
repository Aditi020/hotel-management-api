import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { fetchRooms, createBooking } from '../../data/mockData';
import '../../styles/Forms.css';
import '../../styles/Cards.css';

const BookRoom = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Select dates, 2: Choose room, 3: Confirm booking
  const navigate = useNavigate();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      setError('Failed to load rooms');
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = checkOut - checkIn;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const calculateTotal = (room) => {
    return room ? room.price * calculateNights() : 0;
  };

  const handleSearchRooms = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }
    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      setError('Check-out date must be after check-in date');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setStep(3);
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const booking = {
        userId: user.id,
        userName: user.name,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: parseInt(bookingData.guests),
        totalCost: calculateTotal(selectedRoom)
      };

      await createBooking(booking);
      navigate('/my-bookings');
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card card">
          <div className="form-header">
            <h1 className="form-title">Book a Room</h1>
            <p className="form-description">Find and reserve your perfect stay</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleDateChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleDateChange}
                    className="form-input"
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <select
                  name="guests"
                  value={bookingData.guests}
                  onChange={handleDateChange}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button
                  onClick={handleSearchRooms}
                  className="btn btn-primary"
                >
                  Search Available Rooms
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Room Selection */}
          {step === 2 && (
            <div>
              <div className="flex-between mb-16">
                <div>
                  <h3>Available Rooms</h3>
                  <p style={{ color: '#666' }}>
                    {bookingData.checkIn} to {bookingData.checkOut} • {calculateNights()} night{calculateNights() > 1 ? 's' : ''} • {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  Change Dates
                </button>
              </div>

              <div className="grid grid-2">
                {rooms.map((room) => (
                  <div key={room.id} className="room-card card">
                    <div className="room-image">
                      <img
                        src={room.image}
                        alt={room.name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                      />
                      <div className="room-type-badge">{room.type}</div>
                    </div>
                    
                    <div className="room-content" style={{ padding: '16px' }}>
                      <h3 className="room-name">{room.name}</h3>
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                        {room.description}
                      </p>
                      
                      <div className="room-amenities" style={{ marginBottom: '16px' }}>
                        {room.amenities.slice(0, 4).map((amenity, index) => (
                          <span key={index} className="amenity-tag" style={{
                            display: 'inline-block',
                            background: '#F5F5F5',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            marginRight: '4px',
                            marginBottom: '4px'
                          }}>
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="room-pricing" style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#FF6B6B' }}>
                          ${room.price}<span style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>/night</span>
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                          Total: ${calculateTotal(room)}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleRoomSelection(room)}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        Select This Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Booking Confirmation */}
          {step === 3 && selectedRoom && (
            <div>
              <div className="flex-between mb-16">
                <h3>Confirm Your Booking</h3>
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                >
                  Change Room
                </button>
              </div>

              <div className="booking-summary card" style={{ padding: '24px', marginBottom: '24px' }}>
                <div className="grid grid-2" style={{ alignItems: 'center' }}>
                  <div>
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                      {selectedRoom.name}
                    </h3>
                    <p style={{ color: '#666', marginBottom: '16px' }}>
                      {selectedRoom.description}
                    </p>
                    
                    <div className="booking-details">
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <Calendar size={16} style={{ marginRight: '8px', color: '#666' }} />
                        <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <Users size={16} style={{ marginRight: '8px', color: '#666' }} />
                        <span>{bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <DollarSign size={16} style={{ marginRight: '8px', color: '#666' }} />
                        <span>{calculateNights()} night{calculateNights() > 1 ? 's' : ''} × ${selectedRoom.price}</span>
                      </div>
                      
                      <div style={{ borderTop: '2px solid #E0E0E0', paddingTop: '16px' }}>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#FF6B6B' }}>
                          Total: ${calculateTotal(selectedRoom)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                >
                  Back to Rooms
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading && <span className="loading-spinner"></span>}
                  {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookRoom;