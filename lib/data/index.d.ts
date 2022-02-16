/// <reference types="node" />
import { ColumnDefinition } from "../column";
import Database from "../Database";
import { Value } from "../types";
export declare function readFieldValue(buffer: Buffer, column: ColumnDefinition, db: Database): Value | undefined;
