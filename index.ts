import express from 'express';
import compressionRoutes from './routes';

const app = express();

app.use(express.json());
app.use('/api', compressionRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})