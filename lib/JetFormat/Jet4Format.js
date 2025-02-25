"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jet4Format = void 0;
const SortOrder_1 = require("../SortOrder");
exports.jet4Format = {
    codecType: 0 /* JET */,
    pageSize: 4096,
    textEncoding: "ucs-2",
    defaultSortOrder: SortOrder_1.GENERAL_LEGACY_SORT_ORDER,
    databaseDefinitionPage: {
        encryptedSize: 128,
        passwordSize: 40,
        creationDateOffset: 0x72,
        defaultSortOrder: {
            offset: 0x6e,
            size: 4,
        },
    },
    dataPage: {
        recordCountOffset: 12,
        record: {
            countOffset: 12,
            columnCountSize: 2,
            variableColumnCountSize: 2,
        },
    },
    tableDefinitionPage: {
        rowCountOffset: 16,
        variableColumnCountOffset: 43,
        columnCountOffset: 45,
        logicalIndexCountOffset: 47,
        realIndexCountOffset: 51,
        realIndexStartOffset: 63,
        realIndexEntrySize: 12,
        columnsDefinition: {
            typeOffset: 0,
            indexOffset: 5,
            variableIndexOffset: 7,
            flagsOffset: 15,
            fixedIndexOffset: 21,
            sizeOffset: 23,
            entrySize: 25,
        },
        columnNames: {
            nameLengthSize: 2,
        },
        usageMapOffset: 55,
    },
};
