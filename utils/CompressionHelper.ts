import LZMA from "lzma-web";

const DEFAULT_COMPRESSION_LEVEL = 5;

const lzma = () => new LZMA();

// Compress a string to Uint8Array
const compress = (data: string, compressionLevel: number = DEFAULT_COMPRESSION_LEVEL): Promise<Uint8Array> => {
  return lzma().compress(data, compressionLevel as Mode);
};

// Decompress a Uint8Array to string
const decompress = async (data: Uint8Array): Promise<string> => {
  const decompressed = await lzma().decompress(data);
  if (typeof decompressed === "string") {
    return Promise.resolve(decompressed);
  }
  return new TextDecoder().decode(decompressed);
};

// Convert Uint8Array to base64 string
const toBase64 = (data: Uint8Array): string => {
  return Buffer.from(data).toString('base64');
};

// Convert base64 string back to Uint8Array
const fromBase64 = (base64: string): Uint8Array => {
  return new Uint8Array(Buffer.from(base64, 'base64'));
};

export { compress, decompress, toBase64, fromBase64 };
