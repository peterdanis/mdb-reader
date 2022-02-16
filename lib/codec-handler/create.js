"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCodecHandler = void 0;
const JetFormat_1 = require("../JetFormat");
const identity_1 = require("./handlers/identity");
const jet_1 = require("./handlers/jet");
const office_1 = require("./handlers/office");
function createCodecHandler(databaseDefinitionPage, password) {
    const format = (0, JetFormat_1.getJetFormat)(databaseDefinitionPage);
    switch (format.codecType) {
        case 0 /* JET */:
            return (0, jet_1.createJetCodecHandler)(databaseDefinitionPage);
        case 2 /* OFFICE */:
            return (0, office_1.createOfficeCodecHandler)(databaseDefinitionPage, password);
        default:
            return (0, identity_1.createIdentityHandler)();
    }
}
exports.createCodecHandler = createCodecHandler;
