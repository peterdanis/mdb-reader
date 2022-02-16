"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readComplexOrLong = void 0;
function readComplexOrLong(buffer) {
    return buffer.readInt32LE();
}
exports.readComplexOrLong = readComplexOrLong;
