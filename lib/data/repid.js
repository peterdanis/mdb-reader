"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRepID = void 0;
/**
 * Read replication ID
 *
 * @see https://github.com/mdbtools/mdbtools/blob/c3df30837ec2439d18c5515906072dc3306c0795/src/libmdb/data.c#L958-L972
 */
function readRepID(buffer) {
    return (buffer.slice(0, 4).swap32().toString("hex") + // swap for little-endian
        "-" +
        buffer.slice(4, 6).swap16().toString("hex") + // swap for little-endian
        "-" +
        buffer.slice(6, 8).swap16().toString("hex") + // swap for little-endian
        "-" +
        buffer.slice(8, 10).toString("hex") + // big-endian
        "-" +
        buffer.slice(10, 16).toString("hex") // big-endian
    );
}
exports.readRepID = readRepID;
