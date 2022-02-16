/// <reference types="node" />
import { Cipher } from "./types";
export declare function blockDecrypt(cipher: Cipher, key: Buffer, iv: Buffer, data: Buffer): Buffer;
export declare function blockEncrypt(cipher: Cipher, key: Buffer, iv: Buffer, data: Buffer): Buffer;
