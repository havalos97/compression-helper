#!/usr/bin/env node

const { default: LZMA } = require("lzma-web");

const [,, command, inputData] = process.argv;

const DEFAULT_COMPRESSION_LEVEL = 5;

const compressString = async (data) => {
  const lzma = new LZMA();
  try {
    const compressed = await lzma.compress(data, DEFAULT_COMPRESSION_LEVEL);
    console.log(Buffer.from(compressed).toString("base64"));
  } catch (error) {
    console.error("Error:", error);
  }
};

const decompressString = async (data) => {
  const lzma = new LZMA();
  const decoded = new Uint8Array(Buffer.from(data, "base64"));
  try {
    const decompressed = await lzma.decompress(decoded);
    if (typeof decompressed !== "string") {
      decompressed = new TextDecoder().decode(decompressed);
    }
    console.log(decompressed);
  } catch (error) {
    console.error("Error:", error);
  }
}

const fnSelector = {
  compress: compressString,
  decompress: decompressString,
};

const run = async () => {
  try {
    if (
      (
        command === "compress" ||
        command === "decompress"
      ) && (
        typeof inputData === "string" &&
        inputData.length > 0
      )
    ) {
      await fnSelector[command](inputData);
    } else if (!command) {
      console.log("Usage: compression-cli compress|decompress <inputData:str>");
    } else {
      console.error("Error: Data must be a string.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

run();
