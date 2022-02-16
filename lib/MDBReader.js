"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const PageType_1 = __importStar(require("./PageType"));
const SysObject_1 = require("./SysObject");
const Table_1 = __importDefault(require("./Table"));
const MSYS_OBJECTS_TABLE = "MSysObjects";
const MSYS_OBJECTS_PAGE = 2;
class MDBReader {
    /**
     * @param buffer Buffer of the database.
     */
    constructor(buffer, { password } = {}) {
        this.buffer = buffer;
        (0, PageType_1.assertPageType)(this.buffer, PageType_1.default.DatabaseDefinitionPage);
        this.db = new Database_1.default(this.buffer, password ?? "");
        const mSysObjectsTable = new Table_1.default(MSYS_OBJECTS_TABLE, this.db, MSYS_OBJECTS_PAGE).getData({
            columns: ["Id", "Name", "Type", "Flags"],
        });
        this.sysObjects = mSysObjectsTable.map((mSysObject) => {
            const objectType = mSysObject.Type & 0x7f;
            return {
                objectName: mSysObject.Name,
                objectType: (0, SysObject_1.isSysObjectType)(objectType) ? objectType : null,
                tablePage: mSysObject.Id & 0x00ffffff,
                flags: mSysObject.Flags,
            };
        });
    }
    /**
     * Date when the database was created
     */
    getCreationDate() {
        return this.db.getCreationDate();
    }
    /**
     * Database password
     */
    getPassword() {
        return this.db.getPassword();
    }
    /**
     * Default sort order
     */
    getDefaultSortOrder() {
        return this.db.getDefaultSortOrder();
    }
    /**
     * Returns an array of table names.
     *
     * @param normalTables Includes user tables. Default true.
     * @param systemTables Includes system tables. Default false.
     * @param linkedTables Includes linked tables. Default false.
     */
    getTableNames({ normalTables, systemTables, linkedTables, } = { normalTables: true, systemTables: false, linkedTables: false }) {
        const filteredSysObjects = [];
        for (const sysObject of this.sysObjects) {
            if (sysObject.objectType === SysObject_1.SysObjectType.Table) {
                if (!(0, SysObject_1.isSystemObject)(sysObject)) {
                    if (normalTables) {
                        filteredSysObjects.push(sysObject);
                    }
                }
                else if (systemTables) {
                    filteredSysObjects.push(sysObject);
                }
            }
            else if (sysObject.objectType === SysObject_1.SysObjectType.LinkedTable && linkedTables) {
                filteredSysObjects.push(sysObject);
            }
        }
        return filteredSysObjects.map((o) => o.objectName);
    }
    /**
     * Returns a table by its name.
     *
     * @param name Name of the table. Case sensitive.
     */
    getTable(name) {
        const sysObject = this.sysObjects
            .filter((o) => o.objectType === SysObject_1.SysObjectType.Table)
            .find((o) => o.objectName === name);
        if (!sysObject) {
            throw new Error(`Could not find table with name ${name}`);
        }
        return new Table_1.default(name, this.db, sysObject.tablePage);
    }
}
exports.default = MDBReader;
