"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageEncodingKey = void 0;
const util_1 = require("../util");
function getPageEncodingKey(encodingKey, pageNumber) {
    const pageIndexBuffer = Buffer.alloc(4);
    pageIndexBuffer.writeUInt32LE(pageNumber);
    return (0, util_1.xor)(pageIndexBuffer, encodingKey);
}
exports.getPageEncodingKey = getPageEncodingKey;
