import Siswa from '../models/Siswa.js';

const FIELDS = ['kode_siswa', 'nama_siswa', 'alamat_siswa', 'tgl_siswa', 'jurusan_siswa'];
const isComplete = (body, fields) => fields.every((f) => body[f] && String(body[f]).trim());

export const getAllSiswa = async (req, res) => {
  try {
    res.json(await Siswa.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSiswa = async (req, res) => {
  try {
    const data = await Siswa.getByKode(req.params.kode);
    if (!data) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSiswa = async (req, res) => {
  if (!isComplete(req.body, FIELDS)) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }
  try {
    await Siswa.create(req.body);
    res.status(201).json({ message: 'Siswa berhasil ditambahkan' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Kode siswa sudah digunakan' });
    }
    res.status(500).json({ message: err.message });
  }
};

export const updateSiswa = async (req, res) => {
  if (!isComplete(req.body, FIELDS.slice(1))) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }
  try {
    const affected = await Siswa.update(req.params.kode, req.body);
    if (!affected) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    res.json({ message: 'Siswa berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSiswa = async (req, res) => {
  try {
    const affected = await Siswa.remove(req.params.kode);
    if (!affected) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    res.json({ message: 'Siswa berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};