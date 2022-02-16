"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJetFormat = void 0;
const Jet12Format_1 = require("./Jet12Format");
const Jet14Format_1 = require("./Jet14Format");
const Jet15Format_1 = require("./Jet15Format");
const Jet16Format_1 = require("./Jet16Format");
const Jet17Format_1 = require("./Jet17Format");
const Jet3Format_1 = require("./Jet3Format");
const Jet4Format_1 = require("./Jet4Format");
const MSISAMFormat_1 = require("./MSISAMFormat");
const OFFSET_VERSION = 0x14;
const OFFSET_ENGINE_NAME = 0x4;
const MSISAM_ENGINE = Buffer.from("MSISAM Database", "ascii");
/**
 * Returns the database format of the given buffer
 *
 * @param buffer Full buffer or buffer of first page
 *
 * @see https://github.com/mdbtools/mdbtools/blob/master/HACKING.md#database-definition-page
 * @see https://github.com/mdbtools/mdbtools/blob/7d10a50faf3ff89fbb09252c218eb3ca92f5b19c/include/mdbtools.h#L78-L86
 * @see https://github.com/mdbtools/mdbtools/blob/7d10a50faf3ff89fbb09252c218eb3ca92f5b19c/src/libmdb/file.c#L215-L232
 * @see https://github.com/jahlborn/jackcess/blob/a61e2da7fe9f76614013481c27a557455f080752/src/main/java/com/healthmarketscience/jackcess/impl/JetFormat.java
 */
function getJetFormat(buffer) {
    const version = buffer[OFFSET_VERSION];
    switch (version) {
        case 0x00: // JET 3
            return Jet3Format_1.jet3Format;
        case 0x01: // JET 4
            if (buffer.slice(OFFSET_ENGINE_NAME, OFFSET_ENGINE_NAME + MSISAM_ENGINE.length).equals(MSISAM_ENGINE)) {
                return MSISAMFormat_1.msisamFormat;
            }
            return Jet4Format_1.jet4Format;
        case 0x02: // ACCESS 2007
            return Jet12Format_1.jet12Format;
        case 0x03: // ACCESS 2010
            return Jet14Format_1.jet14Format;
        case 0x04: // ACCESS 2013
            return Jet15Format_1.jet15Format;
        case 0x05: // ACCESS 2016
            return Jet16Format_1.jet16Format;
        case 0x06: // ACCESS 2019
            return Jet17Format_1.jet17Format;
        default:
            throw new Error(`Unsupported version '${version}'`);
    }
}
exports.getJetFormat = getJetFormat;
