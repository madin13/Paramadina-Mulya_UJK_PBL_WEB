import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import siswaRoutes from './routes/siswaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API PIS berjalan' }));
app.use('/api/siswa', siswaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));