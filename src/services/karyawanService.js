import api from './api';

const karyawanService = {
  getList: (page, size) => {
    return api.get('/karyawanindex', {
      params: {
        page,
        size
      }
    });
  },
  
  getFormData: (id = null) => {
    return api.post('/addEdit', id ? { id } : {});
  },
  
  insert: (data) => {
    return api.post('/insert', data);
  },
  
  update: (id, data) => {
    return api.put(`/update/${id}`, data);
  },
  
  delete: (id) => {
    return api.delete(`/delete/${id}`);
  }
};

export default karyawanService;
