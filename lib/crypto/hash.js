"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const crypto_1 = require("crypto");
const util_1 = require("../util");
function hash(algorithm, buffers, length) {
    const digest = (0, crypto_1.createHash)(algorithm);
    for (const buffer of buffers) {
        digest.update(buffer);
    }
    const result = digest.digest();
    if (length !== undefined) {
        return (0, util_1.fixBufferLength)(result, length);
    }
    return result;
}
exports.hash = hash;
