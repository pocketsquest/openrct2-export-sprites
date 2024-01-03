


// Allow chunks to be uncompressed to a maximum of 16 MiB
const MAX_UNCOMPRESSED_CHUNK_SIZE = 16 * 1024 * 1024;

const EXCEPTION_MSG_CORRUPT_CHUNK_SIZE = "Corrupt chunk size.";
const EXCEPTION_MSG_CORRUPT_RLE = "Corrupt RLE compression data.";
const EXCEPTION_MSG_DESTINATION_TOO_SMALL = "Chunk data larger than allocated destination capacity.";
const EXCEPTION_MSG_INVALID_CHUNK_ENCODING = "Invalid chunk encoding.";
const EXCEPTION_MSG_ZERO_SIZED_CHUNK = "Encountered zero-sized chunk.";

const ENCODING = {
  NONE: 0,
  RLE: 1,
  RLECOMPRESSED: 2,
  ROTATE: 3
}

const chunkHeader = {
  encoding: data.readUInt8(16),
  length: data.readUInt32LE(17) 
};

function readChunk(data) {
  try {
    const header = {
      encoding: data.getUInt8(0),
      length: data.getUInt32LE(1, true)
    }

    if (header.length >= MAX_UNCOMPRESSED_CHUNK_SIZE) {
      throw new Error(EXCEPTION_MSG_CORRUPT_CHUNK_SIZE)
    }

    switch (header.encoding) {
      case ENCODING.NONE:
      case ENCODING.RLE:
      case ENCODING.RLECOMPRESSED:
      case ENCODING.ROTATE: {
        const compressedData = new Uint8Array(data.buffer, 5, header.length);
        const buffer = new ArrayBuffer(MAX_UNCOMPRESSED_CHUNK_SIZE);
        const view = new DataView(buffer);
        const uncompressedLength = decodeChunk(view, MAX_UNCOMPRESSED_CHUNK_SIZE, compressedData, header)
      }
      break;
      default:
        throw new Error(EXCEPTION_MSG_INVALID_CHUNK_ENCODING);
    }
  } catch (err) {
    throw err;
  }
}

function decodeChunk(dst, dstCapacity, src, header) {

}

function decodeChunkRLERepeat(dst, dstCapacity, src, srcLength) {
  const immBuffer = allocateLargeTempBuffer();
  const immLength = decodeChunkRLE(immBuffer, MAX_UNCOMPRESSED_CHUNK_SIZE, src, srcLength);
  const size = decodeChunkRepeat(dst, dstCapacity, immBuffer, immLength);
  return size;
}

function decodeChunkRLE(dst, dstCapacity, src, srcLength) {
  const src8 = new Uint8Array(src);
  const dst8 = new Uint8Array(dst);
  let dstIndex = 0;

  for (let i = 0; i < srcLength; i++) {
      const rleCodeByte = src8[i];

      if (rleCodeByte & 128) {
          // 2b) if MSB=1 then B is a flag to duplicate data
          // Read the next byte and copy it (-B+1) times to the destination buffer
          i++;
          const count = 257 - rleCodeByte;

          if (i >= srcLength) {
              throw new Error("Corrupt RLE: Unexpected end of input");
          }

          if (dstIndex + count > dstCapacity) {
              throw new Error("Destination too small: Not enough space for RLE decoding");
          }

          dst8.fill(src8[i], dstIndex, dstIndex + count);
          dstIndex += count;
      } else {
          // 2a) if MSB=0 then B is a counter of how many bytes to copy
          // Execute the following loop: for COUNTER = 1 to B+1 {read a byte from the file and copy it to your target data stream.}
          if (dstIndex + rleCodeByte + 1 > dstCapacity) {
              throw new Error("Destination too small: Not enough space for RLE decoding");
          }

          for (let j = 0; j <= rleCodeByte; j++) {
              i++;
              if (i >= srcLength) {
                  throw new Error("Corrupt RLE: Unexpected end of input");
              }

              dst8[dstIndex++] = src8[i];
          }
      }
  }

  return dstIndex;
}

function decodeChunkRepeat(dst, dstCapacity, src, srcLength) {
  const src8 = Buffer.from(src);
  const dst8 = Buffer.from(dst);
  const dstEnd = dst8.slice(0, dstCapacity);
  let i = 0;

  while (i < srcLength) {
      if (src8[i] === 0xFF) {
          i++;
          if (i >= srcLength) {
              throw new Error(EXCEPTION_MSG_CORRUPT_RLE);
          }
          dst8.writeUInt8(src8[i], dst8.length);
          i++;
      } else {
          const count = (src8[i] & 7) + 1;
          const offset = (src8[i] >> 3) - 32;
          const copySrc = dst8.slice(offset, offset + count);

          if (dst8.length + count >= dstEnd.length || copySrc.length + count >= dstEnd.length) {
              throw new Error(EXCEPTION_MSG_DESTINATION_TOO_SMALL);
          }
          if (copySrc.compare(dst8.slice(0, count)) === 0) {
              throw new Error(EXCEPTION_MSG_CORRUPT_RLE);
          }

          copySrc.copy(dst8, dst8.length);
          i++;
      }
  }

  return dst8.length;
}

function decodeChunkRotate(dst, dstCapacity, src, srcLength) {
  if (srcLength > dstCapacity) {
      throw new Error("Destination too small: Not enough space for Rotate decoding");
  }

  const src8 = new Uint8Array(src);
  const dst8 = new Uint8Array(dst);
  let code = 1;

  for (let i = 0; i < srcLength; i++) {
      dst8[i] = ror8(src8[i], code);
      code = (code + 2) % 8;
  }

  return srcLength;
}

// Helper function for rotating right an 8-bit value (equivalent to Numerics::ror8)
function ror8(value, shift) {
  return (value >> shift) | (value << (8 - shift));
}

function allocateLargeTempBuffer() {
  const buffer = Buffer.alloc(MAX_UNCOMPRESSED_CHUNK_SIZE);
  if (!buffer) {
      throw new Error("Unable to allocate large temporary buffer.");
  }
  return buffer;
}
