"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveKey = void 0;
const util_1 = require("../util");
const hash_1 = require("./hash");
/**
 * Can probably be replaced with `crypto.webcrypto.subtle.derivekey(...)` once node 14 support is dropped
 */
function deriveKey(password, blockBytes, algorithm, salt, iterations, keyByteLength) {
    const baseHash = (0, hash_1.hash)(algorithm, [salt, password]);
    const iterHash = iterateHash(algorithm, baseHash, iterations);
    const finalHash = (0, hash_1.hash)(algorithm, [iterHash, blockBytes]);
    return (0, util_1.fixBufferLength)(finalHash, keyByteLength, 0x36);
}
exports.deriveKey = deriveKey;
function iterateHash(algorithm, baseBuffer, iterations) {
    let iterHash = baseBuffer;
    for (let i = 0; i < iterations; ++i) {
        iterHash = (0, hash_1.hash)(algorithm, [(0, util_1.intToBuffer)(i), iterHash]);
    }
    return iterHash;
}
