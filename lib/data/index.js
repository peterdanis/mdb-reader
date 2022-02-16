"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFieldValue = void 0;
const types_1 = require("../types");
const bigint_1 = require("./bigint");
const binary_1 = require("./binary");
const byte_1 = require("./byte");
const complexOrLong_1 = require("./complexOrLong");
const currency_1 = require("./currency");
const datetime_1 = require("./datetime");
const datetimextended_1 = require("./datetimextended");
const double_1 = require("./double");
const float_1 = require("./float");
const integer_1 = require("./integer");
const memo_1 = require("./memo");
const numeric_1 = require("./numeric");
const ole_1 = require("./ole");
const repid_1 = require("./repid");
const text_1 = require("./text");
const readFnByColType = {
    [types_1.ColumnType.BigInt]: bigint_1.readBigInt,
    [types_1.ColumnType.Binary]: binary_1.readBinary,
    [types_1.ColumnType.Byte]: byte_1.readByte,
    [types_1.ColumnType.Complex]: complexOrLong_1.readComplexOrLong,
    [types_1.ColumnType.Currency]: currency_1.readCurrency,
    [types_1.ColumnType.DateTime]: datetime_1.readDateTime,
    [types_1.ColumnType.DateTimeExtended]: datetimextended_1.readDateTimeExtended,
    [types_1.ColumnType.Double]: double_1.readDouble,
    [types_1.ColumnType.Float]: float_1.readFloat,
    [types_1.ColumnType.Integer]: integer_1.readInteger,
    [types_1.ColumnType.Long]: complexOrLong_1.readComplexOrLong,
    [types_1.ColumnType.Text]: text_1.readText,
    [types_1.ColumnType.Memo]: memo_1.readMemo,
    [types_1.ColumnType.Numeric]: numeric_1.readNumeric,
    [types_1.ColumnType.OLE]: ole_1.readOLE,
    [types_1.ColumnType.RepID]: repid_1.readRepID,
};
function readFieldValue(buffer, column, db) {
    if (column.type === types_1.ColumnType.Boolean) {
        throw new Error("readFieldValue does not handle type boolean");
    }
    const read = readFnByColType[column.type];
    if (!read) {
        return `Column type ${column.type} is currently not supported`;
    }
    return read(buffer, column, db);
}
exports.readFieldValue = readFieldValue;
