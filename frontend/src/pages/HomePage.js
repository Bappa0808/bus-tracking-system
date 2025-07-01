import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Real-Time Bus Tracking</h1>
          <p className="subtitle">Track your bus live, plan your journey, and never miss your ride again.</p>
          <a href="/user" className="cta-btn">Get Started</a>
        </div>
      </section>
      <section className="features">
        <div className="feature-card">
          <span className="feature-icon" role="img" aria-label="Live Map">🗺️</span>
          <h3>Live Map</h3>
          <p>See all buses in real-time on an interactive map.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon" role="img" aria-label="Notifications">🔔</span>
          <h3>Instant Alerts</h3>
          <p>Get notified about arrivals, delays, and route changes.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon" role="img" aria-label="Easy Access">📱</span>
          <h3>Easy Access</h3>
          <p>Use on any device, anywhere, anytime.</p>
        </div>
      </section>
      <section className="map-section">
        <h2>Live Map Preview</h2>
        <div className="map-container">
          {/* The map component will go here */}
          <p className="map-placeholder">Map will be displayed here.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 