"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMapPages = void 0;
const util_1 = require("./util");
const PageType_1 = __importStar(require("./PageType"));
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/HACKING#L556-L622
 */
function findMapPages(buffer, db) {
    switch (buffer[0]) {
        case 0x00:
            return findMapPages0(buffer);
        case 0x01:
            return findMapPages1(buffer, db);
        default:
            throw new Error("Unknown usage map type");
    }
}
exports.findMapPages = findMapPages;
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/map.c#L25-L43
 */
function findMapPages0(buffer) {
    const pageStart = buffer.readUInt32LE(1);
    const bitmap = buffer.slice(5);
    return getPagesFromBitmap(bitmap, pageStart);
}
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/map.c#L44-L84
 */
function findMapPages1(buffer, db) {
    const bitmapLength = (db.format.pageSize - 4) * 8;
    const mapCount = Math.floor((buffer.length - 1) / 4);
    const pages = [];
    for (let mapIndex = 0; mapIndex < mapCount; ++mapIndex) {
        const page = buffer.readUInt32LE(1 + (mapIndex * 4));
        if (page === 0) {
            continue;
        }
        const pageBuffer = db.getPage(page);
        (0, PageType_1.assertPageType)(pageBuffer, PageType_1.default.PageUsageBitmaps);
        const bitmap = pageBuffer.slice(4);
        pages.push(...getPagesFromBitmap(bitmap, mapIndex * bitmapLength));
    }
    return pages;
}
function getPagesFromBitmap(bitmap, pageStart) {
    const pages = [];
    for (let i = 0; i < bitmap.length * 8; i++) {
        if ((0, util_1.getBitmapValue)(bitmap, i)) {
            pages.push(pageStart + i);
        }
    }
    return pages;
}
