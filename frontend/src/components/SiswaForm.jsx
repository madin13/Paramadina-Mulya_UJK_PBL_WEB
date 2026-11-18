import { useState, useEffect } from 'react';

const EMPTY = {
  kode_siswa: '', nama_siswa: '', alamat_siswa: '', tgl_siswa: '', jurusan_siswa: '',
};

export default function SiswaForm({ editData, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editData || EMPTY);
  }, [editData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!editData) setForm(EMPTY);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editData ? '✏️ Edit Siswa' : '➕ Tambah Siswa'}</h2>

      <div className="form-grid">
        <label className="field">Kode Siswa
          <input name="kode_siswa" value={form.kode_siswa} onChange={handleChange}
            placeholder="contoh: S010" disabled={!!editData} required maxLength={10} />
        </label>
        <label className="field">Nama Siswa
          <input name="nama_siswa" value={form.nama_siswa} onChange={handleChange}
            placeholder="Nama lengkap" required />
        </label>
        <label className="field">Tgl Siswa
          <input type="date" name="tgl_siswa" value={form.tgl_siswa} onChange={handleChange} required />
        </label>
        <label className="field full">Alamat Siswa
          <input name="alamat_siswa" value={form.alamat_siswa} onChange={handleChange}
            placeholder="Alamat lengkap" required />
        </label>
        <label className="field">Jurusan Siswa
          <select name="jurusan_siswa" value={form.jurusan_siswa} onChange={handleChange} required>
            <option value="">-- Pilih Jurusan --</option>
            <option value="RPL">RPL</option>
            <option value="TKJ">TKJ</option>
            <option value="Multimedia">Multimedia</option>
            <option value="Akuntansi">Akuntansi</option>
          </select>
        </label>
      </div>

      <div className="actions">
        <button type="submit" className="btn primary">{editData ? 'Update' : 'Simpan'}</button>
        {editData && <button type="button" className="btn" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  );
}