import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/add" element={<Layout><AddPage /></Layout>} />
        <Route path="/edit/:id" element={<Layout><EditPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
