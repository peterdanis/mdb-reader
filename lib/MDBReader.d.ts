/// <reference types="node" />
import Table from "./Table";
import { SortOrder } from "./types";
interface Options {
    password?: string;
}
export default class MDBReader {
    private readonly buffer;
    private readonly sysObjects;
    private readonly db;
    /**
     * @param buffer Buffer of the database.
     */
    constructor(buffer: Buffer, { password }?: Options);
    /**
     * Date when the database was created
     */
    getCreationDate(): Date | null;
    /**
     * Database password
     */
    getPassword(): string | null;
    /**
     * Default sort order
     */
    getDefaultSortOrder(): Readonly<SortOrder>;
    /**
     * Returns an array of table names.
     *
     * @param normalTables Includes user tables. Default true.
     * @param systemTables Includes system tables. Default false.
     * @param linkedTables Includes linked tables. Default false.
     */
    getTableNames({ normalTables, systemTables, linkedTables, }?: {
        normalTables: boolean;
        systemTables: boolean;
        linkedTables: boolean;
    }): string[];
    /**
     * Returns a table by its name.
     *
     * @param name Name of the table. Case sensitive.
     */
    getTable(name: string): Table;
}
export {};
