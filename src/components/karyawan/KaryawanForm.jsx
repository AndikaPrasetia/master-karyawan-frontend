import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Grid,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const KaryawanForm = ({ initialData, positions, onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      birthDate: null,
      position: { id: '' },
      idNumber: '',
      gender: 0
    }
  });

  const selectedPosition = watch('position.id');
  const birthDate = watch('birthDate');

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nama"
                fullWidth
                {...register('name', { required: 'Nama wajib diisi' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Tanggal Lahir"
                value={birthDate ? dayjs(birthDate) : null}
                onChange={(date) => setValue('birthDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.birthDate,
                    helperText: errors.birthDate?.message
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Jabatan</InputLabel>
                <Select
                  value={selectedPosition || ''}
                  onChange={(e) => setValue('position.id', e.target.value)}
                  label="Jabatan"
                >
                  <MenuItem value="">
                    <em>Pilih Jabatan</em>
                  </MenuItem>
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="NIP"
                fullWidth
                type="number"
                {...register('idNumber', { 
                  required: 'NIP wajib diisi',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'NIP hanya boleh berisi angka'
                  }
                })}
                error={!!errors.idNumber}
                helperText={errors.idNumber?.message}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <RadioGroup row value={watch('gender').toString()} onChange={(e) => setValue('gender', parseInt(e.target.value))}>
                  <FormControlLabel value="0" control={<Radio />} label="Pria" />
                  <FormControlLabel value="1" control={<Radio />} label="Wanita" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={onCancel}>
                  Kembali
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Simpan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </Box>
  );
};

export default KaryawanForm;
