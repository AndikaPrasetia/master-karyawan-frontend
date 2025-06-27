import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import KaryawanForm from '../components/karyawan/KaryawanForm';
import karyawanService from '../services/karyawanService';

const AddPage = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoading(true);
        const response = await karyawanService.getFormData();
        setPositions(response.data.positionList);
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Gagal memuat data form. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await karyawanService.insert(data);
      navigate('/');
    } catch (err) {
      console.error('Error adding karyawan:', err);
      setError('Gagal menambahkan data karyawan. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Tambah Data Karyawan
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <KaryawanForm 
        positions={positions}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </Container>
  );
};

export default AddPage;
