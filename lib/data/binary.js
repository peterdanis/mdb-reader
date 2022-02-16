"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBinary = void 0;
function readBinary(buffer) {
    const result = Buffer.alloc(buffer.length);
    buffer.copy(result);
    return result;
}
exports.readBinary = readBinary;
