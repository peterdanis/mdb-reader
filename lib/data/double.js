"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDouble = void 0;
function readDouble(buffer) {
    return buffer.readDoubleLE();
}
exports.readDouble = readDouble;
