import express, { Request, Response } from 'express';
import { compress, decompress, fromBase64, toBase64 } from './utils/CompressionHelper';

const app = express();

app.use(express.json());

const readAsJson = async (req: Request): Promise<{ data: string }> => {
  const body: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const stringifiedBuffer = Buffer.concat(body).toString();
      resolve(JSON.parse(stringifiedBuffer));
    });

    req.on("error", () => reject());
  });
};

export const compressString = async (req: Request, res: Response) => {
  const { data } = await readAsJson(req);
  const compressed = await compress(data);
  res.send({
    result: toBase64(compressed)
  });
};

export const decompressString = async (req: Request, res: Response) => {
  const { data } = await readAsJson(req);
  const decoded = fromBase64(data);
  const decompressed = await decompress(decoded);
  res.send({ result: decompressed });
}

app.post('/compress', compressString)
app.post('/decompress', decompressString)

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})

export default app;