"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.addArray = exports.multiplyArray = exports.doCarry = void 0;
function doCarry(values) {
    const result = [...values];
    const length = result.length;
    for (let i = 0; i < length - 1; ++i) {
        result[i + 1] += Math.floor(result[i] / 10);
        result[i] = result[i] % 10;
    }
    result[length - 1] = result[length - 1] % 10;
    return result;
}
exports.doCarry = doCarry;
function multiplyArray(a, b) {
    if (a.length !== b.length) {
        throw new Error("Array a and b must have the same length");
    }
    const result = new Array(a.length).fill(0);
    for (let i = 0; i < a.length; ++i) {
        if (a[i] === 0)
            continue;
        for (let j = 0; j < b.length; j++) {
            result[i + j] += a[i] * b[j];
        }
    }
    return doCarry(result.slice(0, a.length));
}
exports.multiplyArray = multiplyArray;
function addArray(a, b) {
    if (a.length !== b.length) {
        throw new Error("Array a and b must have the same length");
    }
    const length = a.length;
    const result = [];
    for (let i = 0; i < length; ++i) {
        result[i] = a[i] + b[i];
    }
    return doCarry(result);
}
exports.addArray = addArray;
function toArray(v, length) {
    return doCarry([v, ...new Array(length - 1).fill(0)]);
}
exports.toArray = toArray;
