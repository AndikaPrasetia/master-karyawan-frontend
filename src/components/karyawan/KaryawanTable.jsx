import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatGender } from '../../utils/formatter';

const KaryawanTable = ({ data, loading, pagination, onPaginationChange }) => {
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    onPaginationChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onPaginationChange(0, parseInt(event.target.value, 10));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tanggal Lahir</TableCell>
              <TableCell>Jabatan</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Jenis Kelamin</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((karyawan) => (
              <TableRow key={karyawan.id}>
                <TableCell>{karyawan.id}</TableCell>
                <TableCell>{karyawan.name}</TableCell>
                <TableCell>{formatDate(karyawan.birthDate)}</TableCell>
                <TableCell>{karyawan.position?.name || '-'}</TableCell>
                <TableCell>{karyawan.idNumber}</TableCell>
                <TableCell>{formatGender(karyawan.gender)}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/edit/${karyawan.id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    onClick={() => console.log('Delete', karyawan.id)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Baris per halaman:"
      />
    </Paper>
  );
};

export default KaryawanTable;
