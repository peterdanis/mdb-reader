"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentityHandler = void 0;
function createIdentityHandler() {
    return {
        decryptPage: (b) => b,
        verifyPassword: () => true
    };
}
exports.createIdentityHandler = createIdentityHandler;
