"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildValue = void 0;
/**
 * @see https://github.com/mdbtools/mdbtools/blob/c3df30837ec2439d18c5515906072dc3306c0795/src/libmdb/money.c#L132-L156
 */
function buildValue(array, scale, negative) {
    const length = array.length;
    let value = "";
    if (negative) {
        value += "-";
    }
    let top = length;
    while (top > 0 && top - 1 > scale && !array[top - 1]) {
        top--;
    }
    if (top === 0) {
        value += "0";
    }
    else {
        for (let i = top; i > 0; i--) {
            if (i === scale) {
                value += ".";
            }
            value += array[i - 1].toString();
        }
    }
    return value;
}
exports.buildValue = buildValue;
