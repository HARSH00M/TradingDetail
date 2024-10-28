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
router.get('/search/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const companies = yield (0, config_1.default) `
    SELECT DISTINCT Symbol, Company 
    FROM transactions 
    WHERE Company ILIKE ${name + '%'};
    `;
    // const searchByName = await sql`create table Book(id int primary key, name text, description text)`
    return res.json(companies);
}));
router.get('/find', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const symbol = Array.isArray(req.query.symbol) ? req.query.symbol[0] : req.query.symbol;
    const company = Array.isArray(req.query.company) ? req.query.company[0] : req.query.company;
    // Check if the parameters are of type string, otherwise handle the error
    if (typeof symbol !== 'string' || typeof company !== 'string') {
        return res.status(400).json({ error: 'Invalid query parameters' });
    }
    try {
        const promoters = yield (0, config_1.default) `
            SELECT * FROM transactions 
            WHERE symbol=${symbol};
        `;
        const stock_Detail = yield (0, config_1.default) `SELECT * FROM stockdata WHERE _id=${symbol};`;
        res.json({
            promoters: promoters,
            stock: stock_Detail[0]
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/allcompanies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    let offsetFrom = 0;
    let offsetTo = 0;
    let perPage = 10;
    if (page) {
        offsetFrom = parseInt(page) * perPage;
        offsetTo = offsetFrom + perPage;
    }
    const allCompanies = yield (0, config_1.default) `
    SELECT DISTINCT Symbol, Company 
    FROM transactions ORDER BY company ASC LIMIT ${offsetTo} OFFSET ${offsetFrom};
    `;
    const totalvalues = yield (0, config_1.default) `SELECT COUNT(*) AS total_rows FROM transactions;`;
    const totalpages = Math.ceil(totalvalues[0].total_rows / perPage);
    const response = {
        allCompanies: allCompanies.slice(offsetFrom, offsetTo),
        pages: totalpages
    };
    res.json(response);
}));
// router.get('/insert', async (req: Request, res) => {
//     try {
//         // await sql`drop table Transactions`;
//         const result = await sql`create table Transactions(
//             id SERIAL PRIMARY KEY,
//             symbol VARCHAR(255) NOT NULL,
//             company VARCHAR(255) NOT NULL,
//             acquirer_disposer_name VARCHAR(255),
//             category_of_person VARCHAR(255),
//             no_of_security_prior VARCHAR(255),
//             shareholding_prior_percentage VARCHAR(255),
//             no_of_securities_acquired_disposed VARCHAR(255),
//             value_of_security_acquired_disposed VARCHAR(255),
//             transaction_type VARCHAR(255),
//             type_of_security_post VARCHAR(255),
//             no_of_security_post VARCHAR(255),
//             post_shareholding_percentage VARCHAR(255),
//             allotment_acquisition_date_from VARCHAR(255),
//             allotment_acquisition_date_to VARCHAR(255),
//             initmation_to_company_date VARCHAR(255),
//             mode_of_acquisition VARCHAR(255),
//             exchange VARCHAR(255),
//             broadcast_date_time VARCHAR(255)
//         )`;
//         // const result = JSON.parse(response);
//     } catch (error) {
//         console.error('Connection error:', error);
//     } finally {
//         await sql.end(); // Close the connection
//         console.log('Connection closed.');
//         res.json({ message: 'Connection closed.' });
//     }
// })
exports.default = router;
//# sourceMappingURL=search.js.map