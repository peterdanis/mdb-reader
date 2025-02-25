/// <reference types="node" />
import { JetFormat } from "./JetFormat";
import { SortOrder } from "./types";
export default class Database {
    private readonly buffer;
    readonly password: string;
    readonly format: JetFormat;
    private readonly codecHandler;
    private readonly databaseDefinitionPage;
    constructor(buffer: Buffer, password: string);
    getPassword(): string | null;
    private getPasswordMask;
    getCreationDate(): Date | null;
    getDefaultSortOrder(): Readonly<SortOrder>;
    getPage(page: number): Buffer;
    /**
     * @param pageRow Lower byte contains the row number, the upper three contain page
     *
     * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/data.c#L102-L124
     */
    findPageRow(pageRow: number): Buffer;
    /**
     * @param pageBuffer Buffer of a data page
     *
     * @see https://github.com/brianb/mdbtools/blob/d6f5745d949f37db969d5f424e69b54f0da60b9b/src/libmdb/data.c#L126-L138
     */
    findRow(pageBuffer: Buffer, row: number): Buffer;
}
