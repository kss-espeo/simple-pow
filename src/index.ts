import * as crypto from 'crypto';

const input = Buffer.from(process.argv.slice(2)[0], 'hex');
const targetSuffix = Buffer.from([0xca, 0xfe]);
let currentPrefix = Buffer.from([0x0, 0x0, 0x0, 0x0]);
let currentHash: Buffer;

do {
  currentHash = calculateShaHash(Buffer.concat([currentPrefix, input]));
  if (targetSuffix.compare(currentHash, currentHash.length - targetSuffix.length) == 0) {
    break;
  }
  incrementBE(currentPrefix);
} while (true);

console.log(`hash: ${currentHash.toString('hex')}`);
console.log(`prefix: ${currentPrefix.toString('hex')}`);

function calculateShaHash(input: Buffer): Buffer {
  return crypto.createHash('sha256').update(input).digest();
}

function incrementBE(buffer) {
  for (let i = buffer.length - 1; i >= 0; i--) {
    if (buffer[i]++ !== 255) break;
  }
}
