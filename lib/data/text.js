"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readText = void 0;
const unicodeCompression_1 = require("../unicodeCompression");
function readText(buffer, _col, db) {
    return (0, unicodeCompression_1.uncompressText)(buffer, db.format);
}
exports.readText = readText;
