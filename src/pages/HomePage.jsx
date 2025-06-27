import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KaryawanTable from '../components/karyawan/KaryawanTable';
import karyawanService from '../services/karyawanService';

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    total: 0
  });

  const fetchData = async (page, size) => {
    setLoading(true);
    try {
      const response = await karyawanService.getList(page, size);
      setData(response.data.content);
      setPagination({
        page: response.data.number,
        pageSize: response.data.size,
        total: response.data.totalElements
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize);
  }, []);

  const handlePaginationChange = (newPage) => {
    fetchData(newPage, pagination.pageSize);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Master Karyawan</h1>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/add')}
        >
          Tambah Karyawan
        </Button>
      </div>
      
      <KaryawanTable 
        data={data} 
        loading={loading} 
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default HomePage;
