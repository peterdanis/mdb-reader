"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInRange = exports.fixBufferLength = exports.intToBuffer = exports.isEmptyBuffer = exports.xor = exports.roundToFullByte = exports.getBitmapValue = void 0;
/**
 * Reads a specific bit of a bitmap. Returns true for 1 and false for 0.
 *
 * @param pos 0-based
 */
function getBitmapValue(bitmap, pos) {
    const byteNumber = Math.floor(pos / 8);
    const bitNumber = pos % 8;
    return !!(bitmap[byteNumber] & (1 << bitNumber));
}
exports.getBitmapValue = getBitmapValue;
/**
 * Returns the number of bytes required to store a specific number of bits.
 */
function roundToFullByte(bits) {
    return Math.floor((bits + 7) / 8);
}
exports.roundToFullByte = roundToFullByte;
/**
 * @see https://github.com/crypto-browserify/buffer-xor
 */
function xor(a, b) {
    const length = Math.max(a.length, b.length);
    const buffer = Buffer.allocUnsafe(length);
    for (let i = 0; i < length; i++) {
        buffer[i] = a[i] ^ b[i];
    }
    return buffer;
}
exports.xor = xor;
/**
 * Returns true if buffer only contains zeros.
 */
function isEmptyBuffer(buffer) {
    return buffer.every((v) => v === 0);
}
exports.isEmptyBuffer = isEmptyBuffer;
function intToBuffer(n) {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeInt32LE(n);
    return buffer;
}
exports.intToBuffer = intToBuffer;
function fixBufferLength(buffer, length, padByte = 0) {
    if (buffer.length > length) {
        return buffer.slice(0, length);
    }
    if (buffer.length < length) {
        return Buffer.from(buffer).fill(padByte, buffer.length, length);
    }
    return buffer;
}
exports.fixBufferLength = fixBufferLength;
function isInRange(from, to, value) {
    return from <= value && value <= to;
}
exports.isInRange = isInRange;
