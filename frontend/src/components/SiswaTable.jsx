const formatTanggal = (tgl) =>
  new Date(`${tgl}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

const inisial = (nama) =>
  nama.split(' ').slice(0, 2).map((k) => k[0]).join('').toUpperCase();

export default function SiswaTable({ data, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Kode</th><th>Siswa</th><th>Alamat</th><th>Tgl</th><th>Jurusan</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan="6" className="empty">Data siswa tidak ditemukan</td></tr>
          )}
          {data.map((s) => (
            <tr key={s.kode_siswa}>
              <td className="kode">{s.kode_siswa}</td>
              <td>
                <div className="siswa-cell">
                  <div className="avatar">{inisial(s.nama_siswa)}</div>
                  {s.nama_siswa}
                </div>
              </td>
              <td>{s.alamat_siswa}</td>
              <td>{formatTanggal(s.tgl_siswa)}</td>
              <td>
                <span className={`badge badge-${s.jurusan_siswa.toLowerCase()}`}>
                  {s.jurusan_siswa}
                </span>
              </td>
              <td className="aksi">
                <button className="btn small" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(s.kode_siswa)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}