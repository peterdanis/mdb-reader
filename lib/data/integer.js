"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInteger = void 0;
function readInteger(buffer) {
    return buffer.readInt16LE();
}
exports.readInteger = readInteger;
