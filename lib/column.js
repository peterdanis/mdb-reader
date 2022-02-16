"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColumnFlags = exports.getColumnType = void 0;
const types_1 = require("./types");
const columnTypeMap = {
    0x01: types_1.ColumnType.Boolean,
    0x02: types_1.ColumnType.Byte,
    0x03: types_1.ColumnType.Integer,
    0x04: types_1.ColumnType.Long,
    0x05: types_1.ColumnType.Currency,
    0x06: types_1.ColumnType.Float,
    0x07: types_1.ColumnType.Double,
    0x08: types_1.ColumnType.DateTime,
    0x09: types_1.ColumnType.Binary,
    0x0a: types_1.ColumnType.Text,
    0x0b: types_1.ColumnType.Long,
    0x0c: types_1.ColumnType.Memo,
    0x0f: types_1.ColumnType.RepID,
    0x10: types_1.ColumnType.Numeric,
    0x12: types_1.ColumnType.Complex,
    0x13: types_1.ColumnType.BigInt,
    0x14: types_1.ColumnType.DateTimeExtended,
};
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/include/mdbtools.h#L88-L104
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/HACKING#L498-L515
 */
function getColumnType(typeValue) {
    const type = columnTypeMap[typeValue];
    if (type === undefined) {
        throw new Error("Unsupported column type");
    }
    return type;
}
exports.getColumnType = getColumnType;
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/HACKING#L481-L491
 */
function parseColumnFlags(flags) {
    return {
        fixedLength: !!(flags & 0x01),
        nullable: !!(flags & 0x02),
        autoLong: !!(flags & 0x04),
        autoUUID: !!(flags & 0x40),
    };
}
exports.parseColumnFlags = parseColumnFlags;
