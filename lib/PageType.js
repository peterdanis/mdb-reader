"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPageType = void 0;
/**
 * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/HACKING#L64-L70
 */
var PageType;
(function (PageType) {
    PageType[PageType["DatabaseDefinitionPage"] = 0] = "DatabaseDefinitionPage";
    PageType[PageType["DataPage"] = 1] = "DataPage";
    PageType[PageType["TableDefinition"] = 2] = "TableDefinition";
    PageType[PageType["IntermediateIndexPage"] = 3] = "IntermediateIndexPage";
    PageType[PageType["LeafIndexPages"] = 4] = "LeafIndexPages";
    PageType[PageType["PageUsageBitmaps"] = 5] = "PageUsageBitmaps";
})(PageType || (PageType = {}));
exports.default = PageType;
function assertPageType(buffer, pageType) {
    if (buffer[0] !== pageType) {
        throw new Error(`Wrong page type. Expected ${pageType} but received ${buffer[0]}.`);
    }
}
exports.assertPageType = assertPageType;
