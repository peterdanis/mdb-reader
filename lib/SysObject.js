"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSystemObject = exports.isSysObjectType = exports.SysObjectType = void 0;
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/include/mdbtools.h#L73-L87
 */
var SysObjectType;
(function (SysObjectType) {
    SysObjectType[SysObjectType["Form"] = 0] = "Form";
    SysObjectType[SysObjectType["Table"] = 1] = "Table";
    SysObjectType[SysObjectType["Macro"] = 2] = "Macro";
    SysObjectType[SysObjectType["SystemTable"] = 3] = "SystemTable";
    SysObjectType[SysObjectType["Report"] = 4] = "Report";
    SysObjectType[SysObjectType["Query"] = 5] = "Query";
    SysObjectType[SysObjectType["LinkedTable"] = 6] = "LinkedTable";
    SysObjectType[SysObjectType["Module"] = 7] = "Module";
    SysObjectType[SysObjectType["Relationship"] = 8] = "Relationship";
    SysObjectType[SysObjectType["DatabaseProperty"] = 11] = "DatabaseProperty";
})(SysObjectType = exports.SysObjectType || (exports.SysObjectType = {}));
function isSysObjectType(typeValue) {
    return Object.values(SysObjectType).includes(typeValue);
}
exports.isSysObjectType = isSysObjectType;
const SYSTEM_OBJECT_FLAG = 0x80000000;
const ALT_SYSTEM_OBJECT_FLAG = 0x02;
const SYSTEM_OBJECT_FLAGS = SYSTEM_OBJECT_FLAG | ALT_SYSTEM_OBJECT_FLAG;
/**
 * @see https://github.com/jahlborn/jackcess/blob/3f75e95a21d9a9e3486519511cdd6178e3c2e3e4/src/main/java/com/healthmarketscience/jackcess/impl/DatabaseImpl.java#L194-L202
 */
function isSystemObject(o) {
    return (o.flags & SYSTEM_OBJECT_FLAGS) !== 0;
}
exports.isSystemObject = isSystemObject;
