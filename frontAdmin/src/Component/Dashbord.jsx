import React, { useState } from 'react';
import ProductsDashboard from './ProductsDashboard';
import CoachesDashboard from './CoachesDashboard';
import ExercisesDashboard from './ExercisesDashboard';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('productsDashboard');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout');
  };

  return (
    <div className="container">
      <div style={styles.navbar}>
        <h1 style={styles.title}>Fitness App</h1>
        <div style={styles.navbarRight}>
          <button
            style={activeView === 'productsDashboard' ? { ...styles.navbarButton, ...styles.activeButton } : styles.navbarButton}
            onClick={() => handleViewChange('productsDashboard')}
          >
            Products Dashboard
          </button>
          <button
            style={activeView === 'exercisesDashboard' ? { ...styles.navbarButton, ...styles.activeButton } : styles.navbarButton}
            onClick={() => handleViewChange('exercisesDashboard')}
          >
            Exercises Dashboard
          </button>
          <button
            style={activeView === 'coachesDashboard' ? { ...styles.navbarButton, ...styles.activeButton } : styles.navbarButton}
            onClick={() => handleViewChange('coachesDashboard')}
          >
            Coaches Dashboard
          </button>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Render the selected view here */}
      {activeView === 'productsDashboard' && <ProductsDashboard />}
      {activeView === 'exercisesDashboard' && <ExercisesDashboard />}
      {activeView === 'coachesDashboard' && <CoachesDashboard />}
    </div>
  );
};



const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: '10px 20px',
  },
  title: {
    fontSize: '24px',
    color: 'black',
    textShadow: '2px 2px 4px #d0fd3e'
  },
  
  navbarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  navbarButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'black',
    color: '#d0fd3e',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'black',
    color: '#d0fd3e',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
