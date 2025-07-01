import React, { useState } from 'react';
import './BusRegistration.css';

const BusRegistration = () => {
  const [formData, setFormData] = useState({
    // Bus Information
    busName: '',
    busType: '',
    capacity: '',
    registrationNumber: '',
    yearOfManufacture: '',
    
    // Route Information
    routeName: '',
    startingPoint: '',
    endingPoint: '',
    startTime: '',
    endTime: '',
    frequency: '',
    
    // Stops Information
    stops: [{ name: '', time: '' }],
    
    // Driver Information
    driverName: '',
    driverLicense: '',
    driverContact: '',
    driverEmail: '',
    driverAddress: '',
    
    // Owner Information
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    ownerAddress: '',
    
    // Additional Information
    fare: '',
    amenities: [],
    specialFeatures: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amenitiesOptions = [
    'Air Conditioning',
    'WiFi',
    'USB Charging',
    'Wheelchair Accessible',
    'Luggage Space',
    'Entertainment System',
    'GPS Tracking',
    'Security Camera'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStopChange = (index, field, value) => {
    const newStops = [...formData.stops];
    newStops[index][field] = value;
    setFormData(prev => ({
      ...prev,
      stops: newStops
    }));
  };

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { name: '', time: '' }]
    }));
  };

  const removeStop = (index) => {
    if (formData.stops.length > 1) {
      const newStops = formData.stops.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        stops: newStops
      }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const required = [
      'busName', 'busType', 'capacity', 'registrationNumber',
      'routeName', 'startingPoint', 'endingPoint', 'startTime', 'endTime',
      'driverName', 'driverLicense', 'driverContact',
      'ownerName', 'ownerContact'
    ];

    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (formData.stops.some(stop => !stop.name || !stop.time)) {
      alert('Please fill in all stop details');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPreview(true);
    }, 2000);
  };

  const confirmSubmission = () => {
    // Here you would typically send the data to your backend
    alert('Bus registration submitted successfully! Admin will review and approve your request.');
    setShowPreview(false);
    setFormData({
      busName: '', busType: '', capacity: '', registrationNumber: '', yearOfManufacture: '',
      routeName: '', startingPoint: '', endingPoint: '', startTime: '', endTime: '', frequency: '',
      stops: [{ name: '', time: '' }],
      driverName: '', driverLicense: '', driverContact: '', driverEmail: '', driverAddress: '',
      ownerName: '', ownerContact: '', ownerEmail: '', ownerAddress: '',
      fare: '', amenities: [], specialFeatures: ''
    });
    setCurrentStep(1);
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>🚌 Bus Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Bus Name/ID *</label>
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleInputChange}
            placeholder="e.g., Bus 101"
            required
          />
        </div>
        <div className="form-group">
          <label>Bus Type *</label>
          <select name="busType" value={formData.busType} onChange={handleInputChange} required>
            <option value="">Select Bus Type</option>
            <option value="AC Deluxe">AC Deluxe</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Mini Bus">Mini Bus</option>
            <option value="Express">Express</option>
          </select>
        </div>
        <div className="form-group">
          <label>Passenger Capacity *</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="e.g., 45"
            required
          />
        </div>
        <div className="form-group">
          <label>Registration Number *</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            placeholder="e.g., KA-01-AB-1234"
            required
          />
        </div>
        <div className="form-group">
          <label>Year of Manufacture</label>
          <input
            type="number"
            name="yearOfManufacture"
            value={formData.yearOfManufacture}
            onChange={handleInputChange}
            placeholder="e.g., 2020"
            min="1990"
            max="2024"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>🛣️ Route Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Route Name *</label>
          <input
            type="text"
            name="routeName"
            value={formData.routeName}
            onChange={handleInputChange}
            placeholder="e.g., Downtown Express"
            required
          />
        </div>
        <div className="form-group">
          <label>Starting Point *</label>
          <input
            type="text"
            name="startingPoint"
            value={formData.startingPoint}
            onChange={handleInputChange}
            placeholder="e.g., Central Station"
            required
          />
        </div>
        <div className="form-group">
          <label>Ending Point *</label>
          <input
            type="text"
            name="endingPoint"
            value={formData.endingPoint}
            onChange={handleInputChange}
            placeholder="e.g., Airport Terminal"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time *</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time *</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Frequency</label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
            placeholder="e.g., Every 15 minutes"
          />
        </div>
      </div>

      <h4>📍 Bus Stops</h4>
      {formData.stops.map((stop, index) => (
        <div key={index} className="stop-input">
          <div className="form-group">
            <label>Stop {index + 1} Name *</label>
            <input
              type="text"
              value={stop.name}
              onChange={(e) => handleStopChange(index, 'name', e.target.value)}
              placeholder="e.g., University Campus"
              required
            />
          </div>
          <div className="form-group">
            <label>Arrival Time *</label>
            <input
              type="time"
              value={stop.time}
              onChange={(e) => handleStopChange(index, 'time', e.target.value)}
              required
            />
          </div>
          {formData.stops.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => removeStop(index)}>
              🗑️ Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={addStop}>
        ➕ Add Stop
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>👨‍💼 Driver Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Driver Name *</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleInputChange}
            placeholder="e.g., John Smith"
            required
          />
        </div>
        <div className="form-group">
          <label>Driver License Number *</label>
          <input
            type="text"
            name="driverLicense"
            value={formData.driverLicense}
            onChange={handleInputChange}
            placeholder="e.g., DL-123456789"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number *</label>
          <input
            type="tel"
            name="driverContact"
            value={formData.driverContact}
            onChange={handleInputChange}
            placeholder="e.g., +91 98765 43210"
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="driverEmail"
            value={formData.driverEmail}
            onChange={handleInputChange}
            placeholder="e.g., driver@email.com"
          />
        </div>
        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="driverAddress"
            value={formData.driverAddress}
            onChange={handleInputChange}
            placeholder="Enter driver's address"
            rows="3"
          />
        </div>
      </div>

      <h3>👤 Owner Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Owner Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleInputChange}
            placeholder="e.g., Bus Owner Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number *</label>
          <input
            type="tel"
            name="ownerContact"
            value={formData.ownerContact}
            onChange={handleInputChange}
            placeholder="e.g., +91 98765 43210"
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleInputChange}
            placeholder="e.g., owner@email.com"
          />
        </div>
        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="ownerAddress"
            value={formData.ownerAddress}
            onChange={handleInputChange}
            placeholder="Enter owner's address"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3>💰 Fare & Amenities</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Base Fare (₹) *</label>
          <input
            type="number"
            name="fare"
            value={formData.fare}
            onChange={handleInputChange}
            placeholder="e.g., 25"
            min="0"
            required
          />
        </div>
      </div>

      <h4>🚌 Available Amenities</h4>
      <div className="amenities-grid">
        {amenitiesOptions.map(amenity => (
          <label key={amenity} className="amenity-checkbox">
            <input
              type="checkbox"
              checked={formData.amenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Special Features</label>
        <textarea
          name="specialFeatures"
          value={formData.specialFeatures}
          onChange={handleInputChange}
          placeholder="Any special features or additional information..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="preview-modal">
      <h2>📋 Registration Preview</h2>
      <div className="preview-content">
        <div className="preview-section">
          <h3>🚌 Bus Information</h3>
          <p><strong>Bus Name:</strong> {formData.busName}</p>
          <p><strong>Type:</strong> {formData.busType}</p>
          <p><strong>Capacity:</strong> {formData.capacity} passengers</p>
          <p><strong>Registration:</strong> {formData.registrationNumber}</p>
        </div>

        <div className="preview-section">
          <h3>🛣️ Route Information</h3>
          <p><strong>Route:</strong> {formData.routeName}</p>
          <p><strong>From:</strong> {formData.startingPoint} ({formData.startTime})</p>
          <p><strong>To:</strong> {formData.endingPoint} ({formData.endTime})</p>
          <p><strong>Stops:</strong> {formData.stops.length} stops</p>
        </div>

        <div className="preview-section">
          <h3>👨‍💼 Driver Information</h3>
          <p><strong>Name:</strong> {formData.driverName}</p>
          <p><strong>License:</strong> {formData.driverLicense}</p>
          <p><strong>Contact:</strong> {formData.driverContact}</p>
        </div>

        <div className="preview-section">
          <h3>💰 Fare & Amenities</h3>
          <p><strong>Base Fare:</strong> ₹{formData.fare}</p>
          <p><strong>Amenities:</strong> {formData.amenities.join(', ') || 'None'}</p>
        </div>
      </div>
      
      <div className="preview-actions">
        <button onClick={() => setShowPreview(false)} className="edit-btn">
          ✏️ Edit Details
        </button>
        <button onClick={confirmSubmission} className="submit-btn">
          ✅ Submit for Approval
        </button>
      </div>
    </div>
  );

  return (
    <div className="bus-registration">
      <header className="registration-header">
        <h1>🚌 Bus Registration</h1>
        <p>Register your bus for the tracking system. All registrations require admin approval.</p>
      </header>

      {showPreview ? (
        renderPreview()
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${(currentStep / 4) * 100}%`}}
            ></div>
          </div>

          <div className="step-indicator">
            <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Bus Info</span>
            <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Route</span>
            <span className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Driver</span>
            <span className={`step ${currentStep >= 4 ? 'active' : ''}`}>4. Details</span>
          </div>

          <div className="form-content">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          <div className="form-navigation">
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="nav-btn prev"
              >
                ← Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="nav-btn next"
              >
                Next →
              </button>
            ) : (
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default BusRegistration; 