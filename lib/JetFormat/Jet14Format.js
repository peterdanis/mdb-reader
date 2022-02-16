"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jet14Format = void 0;
const SortOrder_1 = require("../SortOrder");
const Jet12Format_1 = require("./Jet12Format");
exports.jet14Format = {
    ...Jet12Format_1.jet12Format,
    defaultSortOrder: SortOrder_1.GENERAL_SORT_ORDER,
};
