"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCurrency = void 0;
const array_1 = require("../array");
const util_1 = require("./util");
const MAX_PRECISION = 20;
/**
 * @see https://github.com/mdbtools/mdbtools/blob/c3df30837ec2439d18c5515906072dc3306c0795/src/libmdb/money.c#L33-L75
 */
function readCurrency(buffer) {
    const bytesCount = 8;
    const scale = 4;
    let product = (0, array_1.toArray)(0, MAX_PRECISION);
    let multiplier = (0, array_1.toArray)(1, MAX_PRECISION);
    const bytes = buffer.slice(0, bytesCount);
    let negative = false;
    if (bytes[bytesCount - 1] & 0x80) {
        negative = true;
        for (let i = 0; i < bytesCount; ++i) {
            bytes[i] = ~bytes[i];
        }
        for (let i = 0; i < bytesCount; ++i) {
            ++bytes[i];
            if (bytes[i] != 0) {
                break;
            }
        }
    }
    for (const byte of bytes) {
        product = (0, array_1.addArray)(product, (0, array_1.multiplyArray)(multiplier, (0, array_1.toArray)(byte, MAX_PRECISION)));
        multiplier = (0, array_1.multiplyArray)(multiplier, (0, array_1.toArray)(256, MAX_PRECISION));
    }
    return (0, util_1.buildValue)(product, scale, negative);
}
exports.readCurrency = readCurrency;
