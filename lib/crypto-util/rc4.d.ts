/// <reference types="node" />
/**
 * Cannot be replaced with node's crypto module because RC4 was remove from all browsers
 */
export declare function decryptRC4(key: Buffer, data: Buffer): Buffer;
