"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockEncrypt = exports.blockDecrypt = void 0;
const crypto_1 = require("crypto");
function blockDecrypt(cipher, key, iv, data) {
    const algorithm = `${cipher.algorithm}-${key.length * 8}-${cipher.chaining.slice(-3)}`;
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
    decipher.setAutoPadding(false);
    return decipher.update(data);
}
exports.blockDecrypt = blockDecrypt;
function blockEncrypt(cipher, key, iv, data) {
    const algorithm = `${cipher.algorithm}-${key.length * 8}-${cipher.chaining.slice(-3)}`;
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
    decipher.setAutoPadding(false);
    return decipher.update(data);
}
exports.blockEncrypt = blockEncrypt;
