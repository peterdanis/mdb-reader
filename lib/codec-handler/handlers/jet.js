"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJetCodecHandler = void 0;
const crypto_1 = require("../../crypto");
const util_1 = require("../../util");
const identity_1 = require("./identity");
const util_2 = require("../util");
const KEY_OFFSET = 0x3e; // 62
const KEY_SIZE = 4;
function createJetCodecHandler(databaseDefinitionPage) {
    const encodingKey = databaseDefinitionPage.slice(KEY_OFFSET, KEY_OFFSET + KEY_SIZE);
    if ((0, util_1.isEmptyBuffer)(encodingKey)) {
        return (0, identity_1.createIdentityHandler)();
    }
    const decryptPage = (pageBuffer, pageIndex) => {
        const pagekey = (0, util_2.getPageEncodingKey)(encodingKey, pageIndex);
        return (0, crypto_1.decryptRC4)(pagekey, pageBuffer);
    };
    return {
        decryptPage,
        verifyPassword: () => true, // TODO
    };
}
exports.createJetCodecHandler = createJetCodecHandler;
