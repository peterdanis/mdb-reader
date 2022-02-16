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
const codec_handler_1 = require("./codec-handler");
const crypto_1 = require("./crypto");
const datetime_1 = require("./data/datetime");
const JetFormat_1 = require("./JetFormat");
const PageType_1 = __importStar(require("./PageType"));
const unicodeCompression_1 = require("./unicodeCompression");
const util_1 = require("./util");
const PASSWORD_OFFSET = 0x42;
class Database {
    constructor(buffer, password) {
        this.buffer = buffer;
        this.password = password;
        (0, PageType_1.assertPageType)(this.buffer, PageType_1.default.DatabaseDefinitionPage);
        this.format = (0, JetFormat_1.getJetFormat)(this.buffer);
        this.databaseDefinitionPage = Buffer.alloc(this.format.pageSize);
        this.buffer.copy(this.databaseDefinitionPage, 0, 0, this.format.pageSize);
        decryptHeader(this.databaseDefinitionPage, this.format);
        this.codecHandler = (0, codec_handler_1.createCodecHandler)(this.databaseDefinitionPage, password);
        if (!this.codecHandler.verifyPassword()) {
            throw new Error("Wrong password");
        }
    }
    getPassword() {
        let passwordBuffer = this.databaseDefinitionPage.slice(PASSWORD_OFFSET, PASSWORD_OFFSET + this.format.databaseDefinitionPage.passwordSize);
        const mask = this.getPasswordMask();
        if (mask !== null) {
            passwordBuffer = (0, util_1.xor)(passwordBuffer, mask);
        }
        if ((0, util_1.isEmptyBuffer)(passwordBuffer)) {
            return null;
        }
        let password = (0, unicodeCompression_1.uncompressText)(passwordBuffer, this.format);
        const nullCharIndex = password.indexOf("\0");
        if (nullCharIndex >= 0) {
            password = password.slice(0, nullCharIndex);
        }
        return password;
    }
    getPasswordMask() {
        if (this.format.databaseDefinitionPage.creationDateOffset === null) {
            return null;
        }
        const mask = Buffer.alloc(this.format.databaseDefinitionPage.passwordSize);
        const dateValue = this.databaseDefinitionPage.readDoubleLE(this.format.databaseDefinitionPage.creationDateOffset);
        mask.writeInt32LE(Math.floor(dateValue));
        for (let i = 0; i < mask.length; ++i) {
            mask[i] = mask[i % 4];
        }
        return mask;
    }
    getCreationDate() {
        if (this.format.databaseDefinitionPage.creationDateOffset === null) {
            return null;
        }
        const creationDateBuffer = this.databaseDefinitionPage.slice(this.format.databaseDefinitionPage.creationDateOffset, this.format.databaseDefinitionPage.creationDateOffset + 8);
        return (0, datetime_1.readDateTime)(creationDateBuffer);
    }
    getDefaultSortOrder() {
        const value = this.databaseDefinitionPage.readUInt16LE(this.format.databaseDefinitionPage.defaultSortOrder.offset + 3);
        if (value === 0) {
            return this.format.defaultSortOrder;
        }
        let version = this.format.defaultSortOrder.version;
        if (this.format.databaseDefinitionPage.defaultSortOrder.size == 4) {
            version = this.databaseDefinitionPage.readUInt8(this.format.databaseDefinitionPage.defaultSortOrder.offset + 3);
        }
        return Object.freeze({ value, version });
    }
    getPage(page) {
        if (page === 0) {
            // already decrypted
            return this.databaseDefinitionPage;
        }
        const offset = page * this.format.pageSize;
        if (this.buffer.length < offset) {
            throw new Error(`Page ${page} does not exist`);
        }
        const pageBuffer = this.buffer.slice(offset, offset + this.format.pageSize);
        return this.codecHandler.decryptPage(pageBuffer, page);
    }
    /**
     * @param pageRow Lower byte contains the row number, the upper three contain page
     *
     * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/data.c#L102-L124
     */
    findPageRow(pageRow) {
        const page = pageRow >> 8;
        const row = pageRow & 0xff;
        const pageBuffer = this.getPage(page);
        return this.findRow(pageBuffer, row);
    }
    /**
     * @param pageBuffer Buffer of a data page
     *
     * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/data.c#L126-L138
     */
    findRow(pageBuffer, row) {
        const rco = this.format.dataPage.recordCountOffset;
        if (row > 1000) {
            throw new Error("Cannot read rows > 1000"); // TODO: why?
        }
        const start = pageBuffer.readUInt16LE(rco + 2 + row * 2);
        const nextStart = row === 0 ? this.format.pageSize : pageBuffer.readUInt16LE(rco + row * 2);
        return pageBuffer.slice(start, nextStart);
    }
}
exports.default = Database;
const ENCRYPTION_START = 0x18;
const ENCRYPTION_KEY = Buffer.from([0xc7, 0xda, 0x39, 0x6b]);
function decryptHeader(buffer, format) {
    const decryptedBuffer = (0, crypto_1.decryptRC4)(ENCRYPTION_KEY, buffer.slice(ENCRYPTION_START, ENCRYPTION_START + format.databaseDefinitionPage.encryptedSize));
    decryptedBuffer.copy(buffer, ENCRYPTION_START);
}
