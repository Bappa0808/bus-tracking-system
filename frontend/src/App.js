import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import BusRegistration from './pages/BusRegistration';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '2rem 1rem', maxWidth: 1200, margin: '0 auto', width: '100%' }} role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/register-bus" element={<BusRegistration />} />
          <Route path="*" element={<div style={{textAlign: 'center', marginTop: '2rem'}}><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
