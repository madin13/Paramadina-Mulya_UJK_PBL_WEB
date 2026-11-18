import { Router } from 'express';
import {
  getAllSiswa, getSiswa, createSiswa, updateSiswa, deleteSiswa,
} from '../controllers/siswaController.js';

const router = Router();

router.get('/', getAllSiswa);
router.get('/:kode', getSiswa);
router.post('/', createSiswa);
router.put('/:kode', updateSiswa);
router.delete('/:kode', deleteSiswa);

export default router;