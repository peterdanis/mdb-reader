"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBigInt = void 0;
function readBigInt(buffer) {
    return buffer.readBigInt64LE();
}
exports.readBigInt = readBigInt;
