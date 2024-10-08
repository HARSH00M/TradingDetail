"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const pg = require('pg');
const postgres_1 = __importDefault(require("postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE, process.env.DB_PORT);
exports.default = (0, postgres_1.default)({
    host: process.env.HOST, // e.g., localhost or a remote host
    user: process.env.USER, // e.g., postgres
    password: process.env.PASSWORD, // e.g., your database password
    database: process.env.DATABASE, // e.g., the name of your database
    port: parseInt(process.env.DB_PORT),
    // ssl: { rejectUnauthorized: false },              
});
// export default postgres({
//   host: 'localhost',         // e.g., localhost or a remote host
//   user: 'postgres',     // e.g., postgres
//   password: 'User@890', // e.g., your database password
//   database: 'Database', // e.g., the name of your database
//   port: 5432,  
//   // ssl: { rejectUnauthorized: false },              
// });
//# sourceMappingURL=config.js.map