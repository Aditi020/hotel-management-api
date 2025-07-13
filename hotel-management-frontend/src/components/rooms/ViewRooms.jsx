import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { fetchRooms } from '../../data/mockData';
import '../../styles/Forms.css';
import '../../styles/Cards.css';

const ViewRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    let filtered = rooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterType) {
      filtered = filtered.filter(room => room.type === filterType);
    }

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filterType, sortBy]);

  const loadRooms = async () => {
    try {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/rooms/${roomId}`, { method: 'DELETE' });
        
        setRooms(rooms.filter(room => room.id !== roomId));
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    }
  };

  const roomTypes = [...new Set(rooms.map(room => room.type))];

  if (loading) {
    return (
      <div className="form-container">
        <div className="container text-center">
          <div>Loading rooms...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="container">
        <div className="flex-between mb-16">
          <div>
            <h1 className="form-title">Room Management</h1>
            <p className="form-description">Manage your hotel rooms and amenities</p>
          </div>
          <Link to="/rooms/add" className="btn btn-primary">
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add New Room
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="filter-bar">
          <div className="search-bar">
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search rooms by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                style={{ paddingLeft: '48px' }}
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="form-group">
              <label className="form-label">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="price">Price</option>
              </select>
            </div>

            <div className="form-group">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('');
                  setSortBy('name');
                }}
                className="btn btn-secondary"
                style={{ marginTop: '26px' }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid">
          {filteredRooms.length === 0 ? (
            <div className="text-center p-32">
              <p>No rooms found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredRooms.map((room) => (
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
                    <p className="room-description" style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                      {room.description}
                    </p>
                    
                    <div className="room-amenities" style={{ marginBottom: '16px' }}>
                      {room.amenities.slice(0, 3).map((amenity, index) => (
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
                      {room.amenities.length > 3 && (
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="room-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="room-price" style={{ fontSize: '24px', fontWeight: '700', color: '#FF6B6B' }}>
                        ${room.price}<span style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>/night</span>
                      </div>
                      
                      <div className="room-actions" style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          to={`/rooms/update/${room.id}`}
                          className="btn btn-secondary"
                          style={{ padding: '8px 12px', fontSize: '14px' }}
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="btn btn-danger"
                          style={{ padding: '8px 12px', fontSize: '14px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
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

export default ViewRooms;