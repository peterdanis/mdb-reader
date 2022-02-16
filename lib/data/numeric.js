"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNumeric = void 0;
const array_1 = require("../array");
const util_1 = require("./util");
const MAX_PRECISION = 40;
/**
 * @see https://github.com/mdbtools/mdbtools/blob/c3df30837ec2439d18c5515906072dc3306c0795/src/libmdb/money.c#L77-L100
 */
function readNumeric(buffer, column) {
    let product = (0, array_1.toArray)(0, MAX_PRECISION);
    let multiplier = (0, array_1.toArray)(1, MAX_PRECISION);
    const bytes = buffer.slice(1, 17);
    for (let i = 0; i < bytes.length; ++i) {
        const byte = bytes[12 - 4 * Math.floor(i / 4) + (i % 4)];
        product = (0, array_1.addArray)(product, (0, array_1.multiplyArray)(multiplier, (0, array_1.toArray)(byte, MAX_PRECISION)));
        multiplier = (0, array_1.multiplyArray)(multiplier, (0, array_1.toArray)(256, MAX_PRECISION));
    }
    const negative = !!(buffer[0] & 0x80);
    return (0, util_1.buildValue)(product, 
    // Scale is always set for numeric columns
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    column.scale, negative);
}
exports.readNumeric = readNumeric;
