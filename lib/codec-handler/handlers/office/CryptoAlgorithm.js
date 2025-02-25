"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRYPTO_ALGORITHMS = void 0;
const EXTERNAL = {
    id: 0,
    encryptionVerifierHashLength: 0,
    keySizeMin: 0,
    keySizeMax: 0,
};
const RC4 = {
    id: 0x6801,
    encryptionVerifierHashLength: 20,
    keySizeMin: 0x28,
    keySizeMax: 0x200,
};
const AES_128 = {
    id: 0x6801,
    encryptionVerifierHashLength: 32,
    keySizeMin: 0x80,
    keySizeMax: 0x80,
};
const AES_192 = {
    id: 0x660f,
    encryptionVerifierHashLength: 32,
    keySizeMin: 0xc0,
    keySizeMax: 0xc0,
};
const AES_256 = {
    id: 0x6610,
    encryptionVerifierHashLength: 32,
    keySizeMin: 0x100,
    keySizeMax: 0x100,
};
exports.CRYPTO_ALGORITHMS = { EXTERNAL, RC4, AES_128, AES_192, AES_256 };
