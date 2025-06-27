import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import KaryawanForm from '../components/karyawan/KaryawanForm';
import karyawanService from '../services/karyawanService';
import ConfirmDialog from '../components/karyawan/ConfirmDialog';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [karyawanData, setKaryawanData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await karyawanService.getFormData(parseInt(id));
        
        if (!response.data.employee) {
          setError(`Karyawan dengan ID ${id} tidak ditemukan`);
          return;
        }
        
        setKaryawanData(response.data.employee);
        setPositions(response.data.positionList);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Gagal memuat data karyawan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await karyawanService.update(parseInt(id), formData);
      navigate('/');
    } catch (err) {
      console.error('Error updating karyawan:', err);
      setError('Gagal mengupdate data karyawan. Silakan coba lagi.');
      setShowConfirm(false);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Kembali ke Beranda
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Edit Data Karyawan
      </Typography>
      
      {karyawanData && (
        <>
          <KaryawanForm 
            initialData={karyawanData}
            positions={positions}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
          
          <ConfirmDialog
            open
