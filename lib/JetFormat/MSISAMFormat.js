"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msisamFormat = void 0;
const Jet4Format_1 = require("./Jet4Format");
exports.msisamFormat = {
    ...Jet4Format_1.jet4Format,
    codecType: 1 /* MSISAM */,
};
