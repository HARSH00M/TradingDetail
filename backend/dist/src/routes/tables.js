"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
exports.router = (0, express_1.Router)();
const csv_parser_1 = __importDefault(require("csv-parser"));
const fields = [
    'SYM',
    'COMPANY',
    "NAME_OF_THE_ACQUIRER_DISPOSER",
    "CATEGORY_OF_PERSON",
    "TYPE_OF_SECURITY_PRIOR",
    "NO_OF_SECURITY_PRIOR",
    "SHAREHOLDING_PRIOR",
    "TYPE_OF_SECURITY_ACQUIRED_DISPLOSED",
    "NO_OF_SECURITIES_ACQUIRED_DISPLOSED",
    "ACQUISITION_DISPOSAL_TRANSACTION_TYPE"
];
// Endpoint to get the CSV data
exports.router.get('/data', (req, res) => {
    const results = [];
    fs_1.default.createReadStream('./src/files/data.csv') // Replace 'data.csv' with the path to your CSV file
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        const filteredRow = {};
        // console.log(fields)
        fields.forEach(field => {
            // if (row[field]) {
            filteredRow[field] = row[field] || " ";
            // console.log(row[field]) 
            // }
        });
        results.push(filteredRow);
    })
        .on('end', () => {
        res.json(results);
    });
});
//# sourceMappingURL=tables.js.map