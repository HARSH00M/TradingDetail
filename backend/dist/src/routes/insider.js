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
const express_1 = require("express");
const router = (0, express_1.Router)();
const config_1 = __importDefault(require("../database/config"));
const TransactionUpdation_1 = require("../database/TransactionUpdation");
const table03_1 = require("../database/dashboard/table03");
const table01_1 = require("../database/dashboard/table01");
const table02_1 = require("../database/dashboard/table02");
router.post('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, securitytype = null, modeofacquisition = null, transactiontype = null } = req.body;
    // const from = "2024-06-01";
    // const to = "2024-06-02"
    // Check if 'from' and 'to' are of correct type
    console.log("request made");
    if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "from" or "to" query parameters' });
    }
    try {
        const data = yield (0, config_1.default) `
            SELECT * FROM transactions 
            WHERE acquisitiondateto BETWEEN ${from} AND ${to}
            ${securitytype ? (0, config_1.default) `AND securitytypeprior = ${securitytype}` : (0, config_1.default) ``}
            ${transactiontype ? (0, config_1.default) `AND transactiontype = ${transactiontype}` : (0, config_1.default) ``}
            ${modeofacquisition ? (0, config_1.default) `AND modeofacquisition = ${modeofacquisition}` : (0, config_1.default) ``}
            ORDER BY acquisitiondateto DESC;
        `;
        console.log(data.length);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/filtervalues', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const securitytypeData = yield (0, config_1.default) `
            SELECT DISTINCT securitytypeprior FROM transactions;
        `;
        const modeofacquisitionData = yield (0, config_1.default) `
            SELECT DISTINCT modeofacquisition FROM transactions;
        `;
        const transactiontypeData = yield (0, config_1.default) `
            SELECT DISTINCT transactiontype FROM transactions;
        `;
        // Simplifying the output to return arrays of strings
        const securitytype = securitytypeData.map(row => row.securitytypeprior);
        const modeofacquisition = modeofacquisitionData.map(row => row.modeofacquisition);
        const transactiontype = transactiontypeData.map(row => row.transactiontype);
        res.json({
            securitytype,
            modeofacquisition,
            transactiontype
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/performtransactionupdation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, TransactionUpdation_1.PerformTransactionUpdation)();
        console.log('updation done industry column added');
        res.json({
            message: 'updation done industry column added'
        });
    }
    catch (error) {
        throw error;
    }
}));
router.get('/dashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data1 = yield (0, table01_1.MaximumNumbersOfTransactionsIndustryWise)();
        const data2 = yield (0, table02_1.MaximumNumbersOfTransactionsSectorWise)();
        const data3 = yield (0, table03_1.MaximumNumbersOfTransactionsCompanyWise)();
        res.json({
            data1: data1, data2: data2, data3: data3
        });
    }
    catch (err) {
        res.json({
            error: err,
            message: err.message
        });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("working");
}));
exports.default = router;
//# sourceMappingURL=insider.js.map