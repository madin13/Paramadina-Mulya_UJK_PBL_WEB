import { useEffect, useState } from 'react';
import { getSiswa, createSiswa, updateSiswa, deleteSiswa } from './api/siswaApi';
import SiswaForm from './components/SiswaForm';
import SiswaTable from './components/SiswaTable';
import './App.css';

const JURUSAN = ['RPL', 'TKJ', 'Multimedia', 'Akuntansi'];

export default function App() {
  const [siswa, setSiswa] = useState([]);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cari, setCari] = useState('');

  const loadData = async () => {
    try {
      const res = await getSiswa();
      setSiswa(res.data);
    } catch {
      setError('Gagal mengambil data. Pastikan backend berjalan.');
    }
  };

  useEffect(() => { loadData(); }, []);

  const tampilkanSukses = (pesan) => {
    setSuccess(pesan);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSubmit = async (form) => {
    try {
      setError('');
      if (editData) {
        await updateSiswa(editData.kode_siswa, form);
        setEditData(null);
        tampilkanSukses('Data siswa berhasil diupdate');
      } else {
        await createSiswa(form);
        tampilkanSukses('Siswa berhasil ditambahkan');
      }
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleDelete = async (kode) => {
    if (!window.confirm(`Hapus siswa ${kode}?`)) return;
    try {
      setError('');
      await deleteSiswa(kode);
      tampilkanSukses('Siswa berhasil dihapus');
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus');
    }
  };

  const hasilCari = siswa.filter((s) =>
    `${s.kode_siswa} ${s.nama_siswa} ${s.alamat_siswa} ${s.jurusan_siswa}`
      .toLowerCase()
      .includes(cari.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <h1>🎓 PIS - Pusat Informasi Siswa</h1>
        <p>Kelola data siswa dengan mudah</p>
      </header>

      <div className="container">
        <div className="stats">
          <div className="stat"><span>Total Siswa</span><strong>{siswa.length}</strong></div>
          {JURUSAN.map((j) => (
            <div className="stat" key={j}>
              <span>Jurusan {j}</span>
              <strong>{siswa.filter((s) => s.jurusan_siswa === j).length}</strong>
            </div>
          ))}
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <SiswaForm editData={editData} onSubmit={handleSubmit} onCancel={() => setEditData(null)} />

        <div className="card">
          <div className="table-head">
            <h2>Daftar Siswa</h2>
            <input className="search" placeholder="🔍 Cari siswa..."
              value={cari} onChange={(e) => setCari(e.target.value)} />
          </div>
          <SiswaTable data={hasilCari} onEdit={setEditData} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}