import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { mockRooms } from '../../data/mockData';
import '../../styles/Forms.css';

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    amenities: [],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
  const availableAmenities = ['WiFi', 'AC', 'TV', 'Mini Bar', 'Ocean View', 'City View', 'Jacuzzi', 'Butler Service', 'Balcony'];

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchRoom(id).then(setFormData);
    
    const room = mockRooms.find(r => r.id === parseInt(id));
    if (room) {
      setFormData({
        name: room.name,
        type: room.type,
        description: room.description,
        price: room.price.toString(),
        amenities: room.amenities,
        images: [room.image]
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/rooms/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Room updated successfully!');
      setTimeout(() => navigate('/rooms'), 2000);
    } catch (err) {
      setError('Failed to update room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card card">
          <div className="form-header">
            <h1 className="form-title">Update Room</h1>
            <p className="form-description">Modify room details and amenities</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Executive Suite"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Room Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select room type</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Price per Night ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                placeholder="299"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describe the room features, view, and amenities..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amenities</label>
              <div className="amenities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', marginTop: '8px' }}>
                {availableAmenities.map(amenity => (
                  <label key={amenity} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      style={{ marginRight: '8px' }}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/rooms')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <span className="loading-spinner"></span>}
                {loading ? 'Updating Room...' : 'Update Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;