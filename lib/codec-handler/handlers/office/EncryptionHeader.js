"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFlagSet = exports.parseEncryptionHeader = exports.EncryptionHeaderFlags = void 0;
const util_1 = require("../../../util");
const CryptoAlgorithm_1 = require("./CryptoAlgorithm");
const HashAlgorithm_1 = require("./HashAlgorithm");
const FLAGS_OFFSET = 0;
const CRYPTO_OFFSET = 8;
const HASH_OFFSET = 12;
const KEY_SIZE_OFFSET = 16;
exports.EncryptionHeaderFlags = {
    FCRYPTO_API_FLAG: 0x04,
    FDOC_PROPS_FLAG: 0x08,
    FEXTERNAL_FLAG: 0x10,
    FAES_FLAG: 0x20,
};
function parseEncryptionHeader(buffer, validCryptoAlgorithms, validHashAlgorithm) {
    const flags = buffer.readInt32LE(FLAGS_OFFSET);
    const cryptoAlgorithm = getCryptoAlgorithm(buffer.readInt32LE(CRYPTO_OFFSET), flags);
    const hashAlgorithm = getHashAlgorithm(buffer.readInt32LE(HASH_OFFSET), flags);
    const keySize = getKeySize(buffer.readInt32LE(KEY_SIZE_OFFSET), cryptoAlgorithm, getCSPName(buffer.slice(32)));
    if (!validCryptoAlgorithms.includes(cryptoAlgorithm)) {
        throw new Error("Invalid encryption algorithm");
    }
    if (!validHashAlgorithm.includes(hashAlgorithm)) {
        throw new Error("Invalid hash algorithm");
    }
    if (!(0, util_1.isInRange)(cryptoAlgorithm.keySizeMin, cryptoAlgorithm.keySizeMax, keySize)) {
        throw new Error("Invalid key size");
    }
    if (keySize % 8 !== 0) {
        throw new Error("Key size must be multiple of 8");
    }
    return {
        cryptoAlgorithm,
        hashAlgorithm,
        keySize,
    };
}
exports.parseEncryptionHeader = parseEncryptionHeader;
function getCryptoAlgorithm(id, flags) {
    if (id === CryptoAlgorithm_1.CRYPTO_ALGORITHMS.EXTERNAL.id) {
        if (isFlagSet(flags, exports.EncryptionHeaderFlags.FEXTERNAL_FLAG)) {
            return CryptoAlgorithm_1.CRYPTO_ALGORITHMS.EXTERNAL;
        }
        if (isFlagSet(flags, exports.EncryptionHeaderFlags.FCRYPTO_API_FLAG)) {
            if (isFlagSet(flags, exports.EncryptionHeaderFlags.FAES_FLAG)) {
                return CryptoAlgorithm_1.CRYPTO_ALGORITHMS.AES_128;
            }
            else {
                return CryptoAlgorithm_1.CRYPTO_ALGORITHMS.RC4;
            }
        }
        throw new Error("Unsupported encryption algorithm");
    }
    const algorithm = Object.values(CryptoAlgorithm_1.CRYPTO_ALGORITHMS).find((alg) => alg.id === id);
    if (algorithm) {
        return algorithm;
    }
    throw new Error("Unsupported encryption algorithm");
}
function getHashAlgorithm(id, flags) {
    if (id === HashAlgorithm_1.HASH_ALGORITHMS.EXTERNAL.id) {
        if (isFlagSet(flags, exports.EncryptionHeaderFlags.FEXTERNAL_FLAG)) {
            return HashAlgorithm_1.HASH_ALGORITHMS.EXTERNAL;
        }
        return HashAlgorithm_1.HASH_ALGORITHMS.SHA1;
    }
    const algorithm = Object.values(HashAlgorithm_1.HASH_ALGORITHMS).find((alg) => alg.id === id);
    if (algorithm) {
        return algorithm;
    }
    throw new Error("Unsupported hash algorithm");
}
function getCSPName(buffer) {
    const str = buffer.toString("utf16le");
    return str.slice(0, str.length - 1);
}
function getKeySize(keySize, algorithm, cspName) {
    if (keySize !== 0) {
        return keySize;
    }
    if (algorithm === CryptoAlgorithm_1.CRYPTO_ALGORITHMS.RC4) {
        const cspLowerTrimmed = cspName.trim().toLowerCase();
        if (cspLowerTrimmed.length === 0 || cspLowerTrimmed.includes(" base ")) {
            return 0x28;
        }
        else {
            return 0x80;
        }
    }
    return 0;
}
function isFlagSet(flagValue, flagMask) {
    return (flagValue & flagMask) !== 0;
}
exports.isFlagSet = isFlagSet;
