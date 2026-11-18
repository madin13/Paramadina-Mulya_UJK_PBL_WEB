import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api/siswa' });

export const getSiswa = () => api.get('/');
export const createSiswa = (data) => api.post('/', data);
export const updateSiswa = (kode, data) => api.put(`/${kode}`, data);
export const deleteSiswa = (kode) => api.delete(`/${kode}`);