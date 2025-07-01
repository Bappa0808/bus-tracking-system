import React, { useState } from 'react';
import './AdminPanel.css';

// Mock data for admin panel
const mockBuses = [
  { id: 1, name: 'Bus 101', route: 'Downtown Express', status: 'Active', driver: 'John Smith', capacity: 45, currentLocation: 'Main St & 5th Ave' },
  { id: 2, name: 'Bus 202', route: 'City Loop', status: 'Maintenance', driver: 'Sarah Johnson', capacity: 40, currentLocation: 'Central Station' },
  { id: 3, name: 'Bus 303', route: 'Campus Shuttle', status: 'Active', driver: 'Mike Wilson', capacity: 35, currentLocation: 'University Campus' },
  { id: 4, name: 'Bus 404', route: 'Mall Express', status: 'Active', driver: 'Lisa Brown', capacity: 50, currentLocation: 'Shopping Mall' },
  { id: 5, name: 'Bus 505', route: 'Medical Route', status: 'Inactive', driver: 'David Lee', capacity: 30, currentLocation: 'Hospital' }
];

const mockRoutes = [
  { id: 1, name: 'Downtown Express', stops: 5, frequency: 'Every 15 min', status: 'Active' },
  { id: 2, name: 'City Loop', stops: 4, frequency: 'Every 20 min', status: 'Active' },
  { id: 3, name: 'Campus Shuttle', stops: 4, frequency: 'Every 10 min', status: 'Active' },
  { id: 4, name: 'Mall Express', stops: 4, frequency: 'Every 30 min', status: 'Active' },
  { id: 5, name: 'Medical Route', stops: 4, frequency: 'Every 25 min', status: 'Inactive' }
];

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@email.com', status: 'Active', lastLogin: '2024-01-15 10:30 AM' },
  { id: 2, name: 'Bob Smith', email: 'bob@email.com', status: 'Active', lastLogin: '2024-01-15 09:15 AM' },
  { id: 3, name: 'Carol Davis', email: 'carol@email.com', status: 'Inactive', lastLogin: '2024-01-10 02:45 PM' },
  { id: 4, name: 'David Wilson', email: 'david@email.com', status: 'Active', lastLogin: '2024-01-15 11:20 AM' }
];

// Mock data for pending bus registrations
const mockPendingRegistrations = [
  {
    id: 1,
    busName: 'Express Bus 101',
    busType: 'AC Deluxe',
    capacity: 45,
    registrationNumber: 'KA-01-AB-1234',
    routeName: 'Downtown Express',
    startingPoint: 'Central Station',
    endingPoint: 'Airport Terminal',
    startTime: '06:00',
    endTime: '22:00',
    driverName: 'John Smith',
    driverLicense: 'DL-123456789',
    driverContact: '+91 98765 43210',
    ownerName: 'City Transport Ltd',
    ownerContact: '+91 98765 43211',
    fare: 25,
    amenities: ['Air Conditioning', 'WiFi', 'USB Charging'],
    stops: [
      { name: 'Central Station', time: '06:00' },
      { name: 'University Campus', time: '06:15' },
      { name: 'Shopping Mall', time: '06:30' },
      { name: 'Airport Terminal', time: '06:45' }
    ],
    submittedAt: '2024-01-15 14:30',
    status: 'Pending'
  },
  {
    id: 2,
    busName: 'Campus Shuttle 202',
    busType: 'Non-AC',
    capacity: 35,
    registrationNumber: 'KA-02-CD-5678',
    routeName: 'Campus Loop',
    startingPoint: 'University Main Gate',
    endingPoint: 'University Main Gate',
    startTime: '07:00',
    endTime: '20:00',
    driverName: 'Sarah Johnson',
    driverLicense: 'DL-987654321',
    driverContact: '+91 98765 43212',
    ownerName: 'University Transport',
    ownerContact: '+91 98765 43213',
    fare: 15,
    amenities: ['USB Charging', 'Luggage Space'],
    stops: [
      { name: 'University Main Gate', time: '07:00' },
      { name: 'Engineering Block', time: '07:10' },
      { name: 'Library', time: '07:20' },
      { name: 'Hostel Area', time: '07:30' }
    ],
    submittedAt: '2024-01-15 16:45',
    status: 'Pending'
  }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [buses, setBuses] = useState(mockBuses);
  const [routes, setRoutes] = useState(mockRoutes);
  const [users, setUsers] = useState(mockUsers);
  const [pendingRegistrations, setPendingRegistrations] = useState(mockPendingRegistrations);
  const [showAddBus, setShowAddBus] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // Dashboard Statistics
  const stats = {
    totalBuses: buses.length,
    activeBuses: buses.filter(bus => bus.status === 'Active').length,
    totalRoutes: routes.length,
    activeRoutes: routes.filter(route => route.status === 'Active').length,
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'Active').length,
    maintenanceBuses: buses.filter(bus => bus.status === 'Maintenance').length,
    pendingRegistrations: pendingRegistrations.length
  };

  const handleDeleteBus = (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId));
    }
  };

  const handleDeleteRoute = (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
    }
  };

  const handleAddBus = (newBus) => {
    setBuses([...buses, { ...newBus, id: Date.now() }]);
    setShowAddBus(false);
  };

  const handleAddRoute = (newRoute) => {
    setRoutes([...routes, { ...newRoute, id: Date.now() }]);
    setShowAddRoute(false);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
  };

  const handleUpdateBus = (updatedBus) => {
    setBuses(buses.map(bus => bus.id === updatedBus.id ? updatedBus : bus));
    setEditingBus(null);
  };

  const handleUpdateRoute = (updatedRoute) => {
    setRoutes(routes.map(route => route.id === updatedRoute.id ? updatedRoute : route));
    setEditingRoute(null);
  };

  const handleApproveRegistration = (registration) => {
    // Add the approved bus to the buses list
    const newBus = {
      id: Date.now(),
      name: registration.busName,
      route: registration.routeName,
      status: 'Active',
      driver: registration.driverName,
      capacity: registration.capacity,
      currentLocation: registration.startingPoint
    };
    
    setBuses([...buses, newBus]);
    
    // Remove from pending registrations
    setPendingRegistrations(pendingRegistrations.filter(reg => reg.id !== registration.id));
    
    // Close modal
    setSelectedRegistration(null);
    
    alert(`Bus "${registration.busName}" has been approved and added to the system!`);
  };

  const handleRejectRegistration = (registration) => {
    if (window.confirm(`Are you sure you want to reject the registration for "${registration.busName}"?`)) {
      setPendingRegistrations(pendingRegistrations.filter(reg => reg.id !== registration.id));
      setSelectedRegistration(null);
      alert(`Registration for "${registration.busName}" has been rejected.`);
    }
  };

  const DashboardTab = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🚌 Total Buses</h3>
          <p className="stat-number">{stats.totalBuses}</p>
          <p className="stat-detail">{stats.activeBuses} Active</p>
        </div>
        <div className="stat-card">
          <h3>🛣️ Total Routes</h3>
          <p className="stat-number">{stats.totalRoutes}</p>
          <p className="stat-detail">{stats.activeRoutes} Active</p>
        </div>
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
          <p className="stat-detail">{stats.activeUsers} Active</p>
        </div>
        <div className="stat-card">
          <h3>🔧 Maintenance</h3>
          <p className="stat-number">{stats.maintenanceBuses}</p>
          <p className="stat-detail">Buses in repair</p>
        </div>
        <div className="stat-card">
          <h3>📋 Pending Approvals</h3>
          <p className="stat-number">{stats.pendingRegistrations}</p>
          <p className="stat-detail">Bus registrations</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>📊 Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">🚌</span>
            <span>Bus 202 went into maintenance</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👤</span>
            <span>New user registered: Alice Johnson</span>
            <span className="activity-time">4 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🛣️</span>
            <span>Route "Medical Route" deactivated</span>
            <span className="activity-time">1 day ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📋</span>
            <span>New bus registration: Express Bus 101</span>
            <span className="activity-time">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const BusesTab = () => (
    <div className="buses-content">
      <div className="section-header">
        <h3>🚌 Bus Management</h3>
        <button className="add-btn" onClick={() => setShowAddBus(true)}>
          ➕ Add New Bus
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Bus ID</th>
              <th>Route</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Current Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(bus => (
              <tr key={bus.id}>
                <td>{bus.name}</td>
                <td>{bus.route}</td>
                <td>{bus.driver}</td>
                <td>
                  <span className={`status-badge ${bus.status.toLowerCase()}`}>
                    {bus.status}
                  </span>
                </td>
                <td>{bus.capacity}</td>
                <td>{bus.currentLocation}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEditBus(bus)}>
                    ✏️ Edit
                  </button>
                  <button className="action-btn delete" onClick={() => handleDeleteBus(bus.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RoutesTab = () => (
    <div className="routes-content">
      <div className="section-header">
        <h3>🛣️ Route Management</h3>
        <button className="add-btn" onClick={() => setShowAddRoute(true)}>
          ➕ Add New Route
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Route Name</th>
              <th>Stops</th>
              <th>Frequency</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route.id}>
                <td>{route.name}</td>
                <td>{route.stops}</td>
                <td>{route.frequency}</td>
                <td>
                  <span className={`status-badge ${route.status.toLowerCase()}`}>
                    {route.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEditRoute(route)}>
                    ✏️ Edit
                  </button>
                  <button className="action-btn delete" onClick={() => handleDeleteRoute(route.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="users-content">
      <div className="section-header">
        <h3>👥 User Management</h3>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className="action-btn edit">
                    ✏️ Edit
                  </button>
                  <button className="action-btn delete">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RegistrationsTab = () => (
    <div className="registrations-content">
      <div className="section-header">
        <h3>📋 Bus Registration Approvals</h3>
        <p>Review and approve pending bus registration requests</p>
      </div>

      {pendingRegistrations.length === 0 ? (
        <div className="empty-state">
          <h3>🎉 No Pending Registrations</h3>
          <p>All bus registration requests have been processed.</p>
        </div>
      ) : (
        <div className="registrations-grid">
          {pendingRegistrations.map(registration => (
            <div key={registration.id} className="registration-card">
              <div className="registration-header">
                <h4>🚌 {registration.busName}</h4>
                <span className="status-badge pending">Pending Review</span>
              </div>
              
              <div className="registration-details">
                <div className="detail-row">
                  <span className="label">Route:</span>
                  <span>{registration.routeName}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Driver:</span>
                  <span>{registration.driverName}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Capacity:</span>
                  <span>{registration.capacity} passengers</span>
                </div>
                <div className="detail-row">
                  <span className="label">Fare:</span>
                  <span>₹{registration.fare}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Submitted:</span>
                  <span>{registration.submittedAt}</span>
                </div>
              </div>

              <div className="registration-actions">
                <button 
                  className="action-btn view"
                  onClick={() => setSelectedRegistration(registration)}
                >
                  👁️ View Details
                </button>
                <button 
                  className="action-btn approve"
                  onClick={() => handleApproveRegistration(registration)}
                >
                  ✅ Approve
                </button>
                <button 
                  className="action-btn reject"
                  onClick={() => handleRejectRegistration(registration)}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🔧 Admin Dashboard</h1>
        <p>Manage buses, routes, and users from one central location</p>
      </header>

      <div className="admin-content">
        <nav className="admin-nav">
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-tab ${activeTab === 'buses' ? 'active' : ''}`}
            onClick={() => setActiveTab('buses')}
          >
            🚌 Buses
          </button>
          <button 
            className={`nav-tab ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            🛣️ Routes
          </button>
          <button 
            className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button 
            className={`nav-tab ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            📋 Registrations
          </button>
        </nav>

        <main className="admin-main">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'buses' && <BusesTab />}
          {activeTab === 'routes' && <RoutesTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'registrations' && <RegistrationsTab />}
        </main>
      </div>

      {/* Add/Edit Bus Modal */}
      {showAddBus && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Bus</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddBus({
                name: formData.get('name'),
                route: formData.get('route'),
                driver: formData.get('driver'),
                capacity: parseInt(formData.get('capacity')),
                status: formData.get('status'),
                currentLocation: formData.get('location')
              });
            }}>
              <input name="name" placeholder="Bus Name" required />
              <input name="route" placeholder="Route" required />
              <input name="driver" placeholder="Driver Name" required />
              <input name="capacity" type="number" placeholder="Capacity" required />
              <select name="status" required>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input name="location" placeholder="Current Location" required />
              <div className="modal-actions">
                <button type="submit">Add Bus</button>
                <button type="button" onClick={() => setShowAddBus(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Route Modal */}
      {showAddRoute && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Route</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddRoute({
                name: formData.get('name'),
                stops: parseInt(formData.get('stops')),
                frequency: formData.get('frequency'),
                status: formData.get('status')
              });
            }}>
              <input name="name" placeholder="Route Name" required />
              <input name="stops" type="number" placeholder="Number of Stops" required />
              <input name="frequency" placeholder="Frequency (e.g., Every 15 min)" required />
              <select name="status" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="modal-actions">
                <button type="submit">Add Route</button>
                <button type="button" onClick={() => setShowAddRoute(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div className="modal-overlay">
          <div className="modal registration-modal">
            <div className="modal-header">
              <h3>📋 Bus Registration Details</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedRegistration(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div className="registration-sections">
                <div className="section">
                  <h4>🚌 Bus Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Bus Name:</span>
                      <span>{selectedRegistration.busName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Type:</span>
                      <span>{selectedRegistration.busType}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Capacity:</span>
                      <span>{selectedRegistration.capacity} passengers</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Registration:</span>
                      <span>{selectedRegistration.registrationNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h4>🛣️ Route Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Route Name:</span>
                      <span>{selectedRegistration.routeName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">From:</span>
                      <span>{selectedRegistration.startingPoint} ({selectedRegistration.startTime})</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">To:</span>
                      <span>{selectedRegistration.endingPoint} ({selectedRegistration.endTime})</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Base Fare:</span>
                      <span>₹{selectedRegistration.fare}</span>
                    </div>
                  </div>

                  <h5>📍 Bus Stops</h5>
                  <div className="stops-list">
                    {selectedRegistration.stops.map((stop, index) => (
                      <div key={index} className="stop-item">
                        <span className="stop-number">{index + 1}</span>
                        <span className="stop-name">{stop.name}</span>
                        <span className="stop-time">{stop.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h4>👨‍💼 Driver Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Name:</span>
                      <span>{selectedRegistration.driverName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">License:</span>
                      <span>{selectedRegistration.driverLicense}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Contact:</span>
                      <span>{selectedRegistration.driverContact}</span>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h4>👤 Owner Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Name:</span>
                      <span>{selectedRegistration.ownerName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Contact:</span>
                      <span>{selectedRegistration.ownerContact}</span>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h4>🚌 Amenities</h4>
                  <div className="amenities-list">
                    {selectedRegistration.amenities.length > 0 ? (
                      selectedRegistration.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                      ))
                    ) : (
                      <span className="no-amenities">No amenities specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="action-btn approve"
                onClick={() => handleApproveRegistration(selectedRegistration)}
              >
                ✅ Approve Registration
              </button>
              <button 
                className="action-btn reject"
                onClick={() => handleRejectRegistration(selectedRegistration)}
              >
                ❌ Reject Registration
              </button>
              <button 
                className="action-btn cancel"
                onClick={() => setSelectedRegistration(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 