"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRC4CryptoAPICodecHandler = void 0;
const crypto_1 = require("../../../crypto");
const util_1 = require("../../../util");
const util_2 = require("../../util");
const CryptoAlgorithm_1 = require("./CryptoAlgorithm");
const EncryptionHeader_1 = require("./EncryptionHeader");
const EncryptionVerifier_1 = require("./EncryptionVerifier");
const HashAlgorithm_1 = require("./HashAlgorithm");
const VALID_CRYPTO_ALGORITHMS = [CryptoAlgorithm_1.CRYPTO_ALGORITHMS.RC4];
const VALID_HASH_ALGORITHMS = [HashAlgorithm_1.HASH_ALGORITHMS.SHA1];
function createRC4CryptoAPICodecHandler(encodingKey, encryptionProvider, password) {
    const headerLength = encryptionProvider.readInt32LE(8);
    const headerBuffer = encryptionProvider.slice(12, 12 + headerLength);
    const encryptionHeader = (0, EncryptionHeader_1.parseEncryptionHeader)(headerBuffer, VALID_CRYPTO_ALGORITHMS, VALID_HASH_ALGORITHMS);
    const encryptionVerifier = (0, EncryptionVerifier_1.parseEncryptionVerifier)(encryptionProvider, encryptionHeader.cryptoAlgorithm);
    const baseHash = (0, crypto_1.hash)("sha1", [encryptionVerifier.salt, password]);
    const decryptPage = (pageBuffer, pageIndex) => {
        const pageEncodingKey = (0, util_2.getPageEncodingKey)(encodingKey, pageIndex);
        const encryptionKey = getEncryptionKey(encryptionHeader, baseHash, pageEncodingKey);
        return (0, crypto_1.decryptRC4)(encryptionKey, pageBuffer);
    };
    return {
        decryptPage,
        verifyPassword: () => {
            const encryptionKey = getEncryptionKey(encryptionHeader, baseHash, (0, util_1.intToBuffer)(0));
            const rc4Decrypter = (0, crypto_1.createRC4Decrypter)(encryptionKey);
            const verifier = rc4Decrypter(encryptionVerifier.encryptionVerifier);
            const verifierHash = (0, util_1.fixBufferLength)(rc4Decrypter(encryptionVerifier.encryptionVerifierHash), encryptionVerifier.encryptionVerifierHashSize);
            const testHash = (0, util_1.fixBufferLength)((0, crypto_1.hash)("sha1", [verifier]), encryptionVerifier.encryptionVerifierHashSize);
            return verifierHash.equals(testHash);
        },
    };
}
exports.createRC4CryptoAPICodecHandler = createRC4CryptoAPICodecHandler;
function getEncryptionKey(header, baseHash, data) {
    const key = (0, crypto_1.hash)("sha1", [baseHash, data], (0, util_1.roundToFullByte)(header.keySize));
    if (header.keySize === 40) {
        return key.slice(0, (0, util_1.roundToFullByte)(128));
    }
    return key;
}
