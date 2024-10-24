"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csvfile_1 = require("../MulterCsvHandeling/csvfile");
const ProcessUpsertionDatabase_1 = __importDefault(require("../database/ProcessUpsertionDatabase"));
const main_1 = __importDefault(require("../MulterCsvHandeling/main"));
const ProcessFileAddress_1 = __importDefault(require("../MulterCsvHandeling/ProcessFileAddress"));
const CreateStockDataDatabase_1 = __importDefault(require("../database/CreateStockDataDatabase"));
const config_1 = __importDefault(require("../database/config"));
const TransactionUpdation_1 = require("../database/TransactionUpdation");
const CreateInsiderTradingDatabase_1 = __importDefault(require("../database/insider/CreateInsiderTradingDatabase"));
const ProcessInsertion_1 = __importDefault(require("../database/insider/ProcessInsertion"));
const csvfile2_1 = require("../MulterCsvHandeling/csvfile2");
exports.router = (0, express_1.Router)();
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
// CREATING TABLE OF STOCK DATA AND INSERTING DATA INTO IT
exports.router.get('/createstockdatabase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, CreateStockDataDatabase_1.default)();
        res.json({
            result: result,
            message: "Created Stock Database"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            error: err,
            message: err.message
        });
    }
}));
exports.router.post('/upload', (0, main_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filepath = (0, ProcessFileAddress_1.default)(req.generatedFilename);
        const result = yield (0, csvfile_1.processCsv)(filepath);
        const upsert = yield (0, ProcessUpsertionDatabase_1.default)(result);
        res.json({
            filename: req.generatedFilename,
            upsert: upsert
        });
    }
    catch (error) {
        res.json({
            error: error,
            message: error.message
        });
    }
}));
exports.router.get('/transactionupdation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, TransactionUpdation_1.PerformTransactionUpdation)();
        res.json({
            data: data,
            message: "Updated transactions table"
        });
    }
    catch (error) {
        res.json({
            message: error.message,
            error: error
        });
    }
    finally {
        config_1.default.end();
    }
}));
// CREATING TABLE OF TRANSACTIONS AND INSERTING DATA INTO IT
exports.router.get('/createinsidertradingdatabase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, CreateInsiderTradingDatabase_1.default)();
        res.json({
            result: result,
            message: "Created Insider Trading Database"
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            error: err,
            message: err.message
        });
    }
}));
exports.router.post('/ifupload', (0, main_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filepath = (0, ProcessFileAddress_1.default)(req.generatedFilename);
        const result = yield (0, csvfile2_1.processCsvforTF)(filepath);
        const insert = yield (0, ProcessInsertion_1.default)(result);
        // const upsert = await (result);
        res.json({
            filename: req.generatedFilename,
            insert: insert
        });
    }
    catch (err) {
        console.log("error : ", err.message);
        console.log(err);
        res.json({
            error: err,
            message: err.message
        });
    }
}));
// router.get('/query', async (req : Request, res)=>{
//   try{
//     const {query} = req.body;
//     const result = await sql.unsafe(query)
//     res.json({
//       query : result,
//     });
//   }catch(err){
//     console.log(err)
//     res.json({
//       error : err,
//       message : err.message
//     })
//   }
// })
// router.get('/delete', async (req, res)=>{
//   try{
//     const query = await sql`select * from stockdata;`;
//     res.json({
//       query : query,
//     });
//   }catch(error) {
//     res.json({
//       message : error.message,
//       error : error
//     })
//   } finally{
//     sql.end();
//   }
exports.default = exports.router;
//# sourceMappingURL=tables.js.map