"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFloat = void 0;
function readFloat(buffer) {
    return buffer.readFloatLE();
}
exports.readFloat = readFloat;
