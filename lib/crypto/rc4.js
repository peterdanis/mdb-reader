"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRC4Decrypter = exports.decryptRC4 = void 0;
/**
 * Cannot be replaced with node's crypto module because RC4 was remove from all browsers
 */
function decryptRC4(key, data) {
    const decrypt = createRC4Decrypter(key);
    return decrypt(data);
}
exports.decryptRC4 = decryptRC4;
function createRC4Decrypter(key) {
    const S = createKeyStream(key);
    let i = 0;
    let j = 0;
    return (data) => {
        const resultBuffer = Buffer.from(data);
        /**
         * Pseudo-random generation algorithm (PRGA)
         */
        for (let k = 0; k < data.length; ++k) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]];
            resultBuffer[k] ^= S[(S[i] + S[j]) % 256];
        }
        return resultBuffer;
    };
}
exports.createRC4Decrypter = createRC4Decrypter;
/**
 * Key-scheduling algorithm (KSA)
 */
function createKeyStream(key) {
    const S = new Uint8Array(256);
    for (let i = 0; i < 256; ++i) {
        S[i] = i;
    }
    let j = 0;
    for (let i = 0; i < 256; ++i) {
        j = (j + S[i] + key[i % key.length]) % 256;
        [S[i], S[j]] = [S[j], S[i]];
    }
    return S;
}
