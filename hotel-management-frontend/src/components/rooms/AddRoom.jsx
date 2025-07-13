import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import '../../styles/Forms.css';

const AddRoom = () => {
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
  const navigate = useNavigate();

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
  const availableAmenities = ['WiFi', 'AC', 'TV', 'Mini Bar', 'Ocean View', 'City View', 'Jacuzzi', 'Butler Service', 'Balcony'];

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // TODO: Replace with actual image upload to server/cloud storage
    // const uploadPromises = files.map(file => uploadImage(file));
    // const imageUrls = await Promise.all(uploadPromises);
    
    // For now, create preview URLs
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/rooms', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Room added successfully!');
      setTimeout(() => navigate('/rooms'), 2000);
    } catch (err) {
      setError('Failed to add room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card card">
          <div className="form-header">
            <h1 className="form-title">Add New Room</h1>
            <p className="form-description">Create a new room listing for your hotel</p>
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

            <div className="form-group">
              <label className="form-label">Room Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="form-file"
              />
              {formData.images.length > 0 && (
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Room ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="image-remove-btn"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                {loading ? 'Adding Room...' : 'Add Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;