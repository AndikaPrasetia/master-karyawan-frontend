import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      <main style={{ 
        flex: 1, 
        padding: '20px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        {children || <Outlet />}
      </main>
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center'
      }}>
        &copy; 2025 Master Karyawan
      </footer>
    </div>
  );
};

export default Layout;
