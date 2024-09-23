"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)({
    host: 'localhost', // Host of database server
    port: 5432, // Port of database server
    database: 'Database', // Name of database to connect to
    username: 'postgres', // Username of database user
    password: 'User@890',
    // ssl: { rejectUnauthorized: false }
}); // will use psql environment variables
exports.default = sql;
//# sourceMappingURL=dbConnection.js.map