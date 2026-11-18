import { pool } from '../config/db.js';

export default class Siswa {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM siswa ORDER BY kode_siswa');
    return rows;
  }

  static async getByKode(kode) {
    const { rows } = await pool.query('SELECT * FROM siswa WHERE kode_siswa = $1', [kode]);
    return rows[0];
  }

  static async create({ kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa }) {
    await pool.query(
      `INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
       VALUES ($1, $2, $3, $4, $5)`,
      [kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa]
    );
  }

  static async update(kode, { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa }) {
    const result = await pool.query(
      `UPDATE siswa
       SET nama_siswa = $1, alamat_siswa = $2, tgl_siswa = $3, jurusan_siswa = $4
       WHERE kode_siswa = $5`,
      [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, kode]
    );
    return result.rowCount;
  }

  static async remove(kode) {
    const result = await pool.query('DELETE FROM siswa WHERE kode_siswa = $1', [kode]);
    return result.rowCount;
  }
}