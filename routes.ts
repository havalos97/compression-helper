import express from 'express';
import {
  compressString,
  decompressString,
} from './controllers/compressionController';

const router = express.Router();

router.post('/compress', compressString);

router.post('/decompress', decompressString);

export default router;