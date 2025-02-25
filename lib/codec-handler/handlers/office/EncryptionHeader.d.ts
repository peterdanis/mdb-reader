/// <reference types="node" />
import { CryptoAlgorithm } from "./CryptoAlgorithm";
import { HashAlgorithm } from "./HashAlgorithm";
export declare const EncryptionHeaderFlags: {
    FCRYPTO_API_FLAG: number;
    FDOC_PROPS_FLAG: number;
    FEXTERNAL_FLAG: number;
    FAES_FLAG: number;
};
export interface EncryptionHeader {
    readonly cryptoAlgorithm: CryptoAlgorithm;
    readonly keySize: number;
    readonly hashAlgorithm: HashAlgorithm;
}
export declare function parseEncryptionHeader(buffer: Buffer, validCryptoAlgorithms: CryptoAlgorithm[], validHashAlgorithm: HashAlgorithm[]): EncryptionHeader;
export declare function isFlagSet(flagValue: number, flagMask: number): boolean;
