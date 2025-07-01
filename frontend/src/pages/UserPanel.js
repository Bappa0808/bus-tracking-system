import React, { useState } from 'react';
import './UserPanel.css';

const allBuses = [
  { 
    id: 1, 
    name: 'Bus 101', 
    status: 'On Time', 
    location: 'Main St & 5th Ave', 
    eta: '5 min',
    route: 'Downtown Express',
    origin: 'Central Station',
    destination: 'Airport Terminal',
    nextStop: 'University Campus',
    progress: 40,
    stops: [
      { name: 'Central Station', time: '10:30 AM', status: 'completed' },
      { name: 'Main St & 5th Ave', time: '10:35 AM', status: 'current' },
      { name: 'University Campus', time: '10:40 AM', status: 'upcoming' },
      { name: 'Shopping Mall', time: '10:45 AM', status: 'upcoming' },
      { name: 'Airport Terminal', time: '10:55 AM', status: 'upcoming' }
    ]
  },
  { 
    id: 2, 
    name: 'Bus 202', 
    status: 'Delayed', 
    location: 'Central Station', 
    eta: '12 min',
    route: 'City Loop',
    origin: 'Central Station',
    destination: 'Central Station',
    nextStop: 'Hospital',
    progress: 20,
    stops: [
      { name: 'Central Station', time: '10:25 AM', status: 'current' },
      { name: 'Hospital', time: '10:35 AM', status: 'upcoming' },
      { name: 'Library', time: '10:45 AM', status: 'upcoming' },
      { name: 'Park', time: '10:55 AM', status: 'upcoming' },
      { name: 'Central Station', time: '11:05 AM', status: 'upcoming' }
    ]
  },
  { 
    id: 3, 
    name: 'Bus 303', 
    status: 'On Time', 
    location: 'University Campus', 
    eta: '8 min',
    route: 'Campus Shuttle',
    origin: 'University Campus',
    destination: 'Shopping Mall',
    nextStop: 'Shopping Mall',
    progress: 60,
    stops: [
      { name: 'University Campus', time: '10:20 AM', status: 'current' },
      { name: 'Shopping Mall', time: '10:28 AM', status: 'upcoming' },
      { name: 'Hospital', time: '10:35 AM', status: 'upcoming' },
      { name: 'Central Station', time: '10:45 AM', status: 'upcoming' }
    ]
  },
  { 
    id: 4, 
    name: 'Bus 404', 
    status: 'On Time', 
    location: 'Shopping Mall', 
    eta: '15 min',
    route: 'Mall Express',
    origin: 'Shopping Mall',
    destination: 'Airport Terminal',
    nextStop: 'Central Station',
    progress: 25,
    stops: [
      { name: 'Shopping Mall', time: '10:15 AM', status: 'current' },
      { name: 'Central Station', time: '10:30 AM', status: 'upcoming' },
      { name: 'University Campus', time: '10:40 AM', status: 'upcoming' },
      { name: 'Airport Terminal', time: '10:55 AM', status: 'upcoming' }
    ]
  },
  { 
    id: 5, 
    name: 'Bus 505', 
    status: 'Delayed', 
    location: 'Hospital', 
    eta: '20 min',
    route: 'Medical Route',
    origin: 'Hospital',
    destination: 'Library',
    nextStop: 'Park',
    progress: 30,
    stops: [
      { name: 'Hospital', time: '10:10 AM', status: 'current' },
      { name: 'Park', time: '10:30 AM', status: 'upcoming' },
      { name: 'Library', time: '10:45 AM', status: 'upcoming' },
      { name: 'Central Station', time: '11:00 AM', status: 'upcoming' }
    ]
  }
];

const allStops = [
  'Central Station', 'Main St & 5th Ave', 'University Campus', 
  'Shopping Mall', 'Airport Terminal', 'Hospital', 'Library', 'Park'
];

const BusDetailView = ({ bus, onClose }) => {
  return (
    <div className="bus-detail-overlay" onClick={onClose}>
      <div className="bus-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bus-detail-header">
          <h2>🚌 {bus.name} - {bus.route}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="bus-detail-content">
          {/* Current Status Section */}
          <div className="current-status-section">
            <div className="status-indicator">
              <span className={`status-badge ${bus.status === 'Delayed' ? 'delayed' : 'on-time'}`}>
                {bus.status === 'Delayed' ? '⚠️ Delayed' : '✅ On Time'}
              </span>
            </div>
            <div className="current-location-box">
              <h3>📍 Where is your bus now?</h3>
              <p className="location-text">{bus.location}</p>
            </div>
            <div className="next-stop-box">
              <h3>🎯 Next Stop</h3>
              <p className="next-stop-text">{bus.nextStop}</p>
              <p className="eta-text">Arrives in: <strong>{bus.eta}</strong></p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <h3>📊 Journey Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${bus.progress}%`}}></div>
            </div>
            <p className="progress-text">{bus.progress}% of journey completed</p>
          </div>

          {/* Route Timeline */}
          <div className="route-stops">
            <h3>🗺️ All Stops on This Route</h3>
            <div className="stops-timeline">
              {bus.stops.map((stop, index) => (
                <div key={index} className={`stop-item ${stop.status}`}>
                  <div className="stop-icon">
                    {stop.status === 'completed' && '✅'}
                    {stop.status === 'current' && '🚌'}
                    {stop.status === 'upcoming' && '⏳'}
                  </div>
                  <div className="stop-time">{stop.time}</div>
                  <div className="stop-info">
                    <div className="stop-name">{stop.name}</div>
                    <div className="stop-status">
                      {stop.status === 'completed' && '✓ Already passed this stop'}
                      {stop.status === 'current' && '🚌 Bus is here now!'}
                      {stop.status === 'upcoming' && '⏳ Coming soon'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserPanel = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchBusId, setSearchBusId] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredBuses, setFilteredBuses] = useState(allBuses);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  const closeBusDetail = () => {
    setSelectedBus(null);
  };

  const handleSearch = () => {
    setHasSearched(true);
    let results = allBuses;

    if (searchOrigin) {
      results = results.filter(bus => 
        bus.origin.toLowerCase().includes(searchOrigin.toLowerCase()) ||
        bus.stops.some(stop => stop.name.toLowerCase().includes(searchOrigin.toLowerCase()))
      );
    }

    if (searchDestination) {
      results = results.filter(bus => 
        bus.destination.toLowerCase().includes(searchDestination.toLowerCase()) ||
        bus.stops.some(stop => stop.name.toLowerCase().includes(searchDestination.toLowerCase()))
      );
    }

    if (searchBusId) {
      results = results.filter(bus => 
        bus.name.toLowerCase().includes(searchBusId.toLowerCase())
      );
    }

    setFilteredBuses(results);
  };

  const clearSearch = () => {
    setSearchOrigin('');
    setSearchDestination('');
    setSearchBusId('');
    setFilteredBuses(allBuses);
    setHasSearched(false);
    setShowOriginSuggestions(false);
    setShowDestinationSuggestions(false);
  };

  const getSuggestions = (input, type) => {
    if (!input) return [];
    const suggestions = allStops.filter(stop => 
      stop.toLowerCase().includes(input.toLowerCase())
    );
    return suggestions.slice(0, 3);
  };

  const handleOriginSelect = (suggestion) => {
    setSearchOrigin(suggestion);
    setShowOriginSuggestions(false);
  };

  const handleDestinationSelect = (suggestion) => {
    setSearchDestination(suggestion);
    setShowDestinationSuggestions(false);
  };

  const getNoResultsMessage = () => {
    if (!hasSearched) return null;
    
    let message = "😕 No buses found";
    if (searchOrigin && searchDestination) {
      message += ` from "${searchOrigin}" to "${searchDestination}"`;
    } else if (searchOrigin) {
      message += ` from "${searchOrigin}"`;
    } else if (searchDestination) {
      message += ` to "${searchDestination}"`;
    } else if (searchBusId) {
      message += ` with ID "${searchBusId}"`;
    }
    message += ".";
    
    return message;
  };

  return (
    <div className="user-panel">
      <header className="user-header">
        <h1>Welcome to Your Dashboard</h1>
        <p className="user-subtitle">Track your favorite buses in real-time and get instant updates.</p>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-toggle">
          <button 
            className={`search-btn ${showSearch ? 'active' : ''}`}
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍 {showSearch ? 'Hide Search' : 'Search Buses'}
          </button>
        </div>
        
        {showSearch && (
          <div className="search-form">
            <div className="search-inputs">
              <div className="input-group">
                <label>📍 From:</label>
                <input
                  type="text"
                  placeholder="Enter starting point..."
                  value={searchOrigin}
                  onChange={(e) => {
                    setSearchOrigin(e.target.value);
                    setShowOriginSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => {
                    setShowOriginSuggestions(searchOrigin.length > 0);
                    setFilteredBuses(allBuses);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowOriginSuggestions(false), 200);
                  }}
                />
                {showOriginSuggestions && searchOrigin && (
                  <div className="suggestions">
                    {getSuggestions(searchOrigin, 'origin').map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="suggestion-item"
                        onClick={() => handleOriginSelect(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="input-group">
                <label>🎯 To:</label>
                <input
                  type="text"
                  placeholder="Enter destination..."
                  value={searchDestination}
                  onChange={(e) => {
                    setSearchDestination(e.target.value);
                    setShowDestinationSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => {
                    setShowDestinationSuggestions(searchDestination.length > 0);
                    setFilteredBuses(allBuses);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowDestinationSuggestions(false), 200);
                  }}
                />
                {showDestinationSuggestions && searchDestination && (
                  <div className="suggestions">
                    {getSuggestions(searchDestination, 'destination').map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="suggestion-item"
                        onClick={() => handleDestinationSelect(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="input-group">
                <label>🚌 Bus ID:</label>
                <input
                  type="text"
                  placeholder="Enter bus number..."
                  value={searchBusId}
                  onChange={(e) => setSearchBusId(e.target.value)}
                  onFocus={() => setFilteredBuses(allBuses)}
                />
              </div>
            </div>
            
            <div className="search-actions">
              <button className="search-submit" onClick={handleSearch}>
                🔍 Search Buses
              </button>
              <button className="search-clear" onClick={clearSearch}>
                🗑️ Clear
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="user-summary">
        <div className="summary-card">
          <h2>Available Buses</h2>
          <p className="summary-number">{filteredBuses.length}</p>
        </div>
      </section>

      <section className="bus-list-section">
        <h2>🚌 Bus Results</h2>
        {hasSearched && filteredBuses.length === 0 ? (
          <div className="no-results">
            <p>{getNoResultsMessage()}</p>
            <p>💡 Try adjusting your search terms or check different routes.</p>
            <p>📍 Available stops: Central Station, University Campus, Shopping Mall, Hospital, Library, Park, Airport Terminal</p>
          </div>
        ) : (
          <ul className="bus-list">
            {filteredBuses.map(bus => (
              <li 
                key={bus.id} 
                className={`bus-card ${bus.status === 'Delayed' ? 'delayed' : 'on-time'} clickable`}
                onClick={() => handleBusClick(bus)}
              >
                <div className="bus-info">
                  <span className="bus-name">🚌 {bus.name}</span>
                  <span className={`bus-status ${bus.status === 'Delayed' ? 'delayed' : 'on-time'}`}>
                    {bus.status === 'Delayed' ? '⚠️ Delayed' : '✅ On Time'}
                  </span>
                </div>
                <div className="bus-meta">
                  <span className="bus-location">📍 {bus.location}</span>
                  <span className="bus-eta">⏰ Arrives in: {bus.eta}</span>
                </div>
                <div className="bus-route">
                  <span className="route-name">🛣️ {bus.route}</span>
                  <span className="route-details">
                    {bus.origin} → {bus.destination}
                  </span>
                </div>
                <div className="bus-route">
                  <span className="view-details">👆 Click to see full journey →</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selectedBus && (
        <BusDetailView bus={selectedBus} onClose={closeBusDetail} />
      )}
    </div>
  );
};

export default UserPanel; 