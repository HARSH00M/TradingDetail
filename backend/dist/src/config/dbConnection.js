"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)({
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT), // Port of database server
    database: process.env.DATABASE_NAME, // Name of database to connect to
    username: process.env.USERNAME, // Username of database user
    password: process.env.PASSWORD,
}); // will use psql environment variables
exports.default = sql;
//# sourceMappingURL=dbConnection.js.map