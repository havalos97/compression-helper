import { Request, Response } from 'express';
import { compress, decompress, fromBase64, toBase64 } from '../utils/CompressionHelper';

export const compressString = async (req: Request, res: Response) => {
  const { data } = req.body;
  const compressed = await compress(data);
  res.send({
    result: toBase64(compressed)
  });
};

export const decompressString = async (req: Request, res: Response) => {
  const { data } = req.body;
  const decoded = fromBase64(data);
  const decompressed = await decompress(decoded);
  res.send({ result: decompressed });
};