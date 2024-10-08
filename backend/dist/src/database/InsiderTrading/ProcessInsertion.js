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
exports.default = ProcessInsertionDatabase;
const config_1 = __importDefault(require("../config"));
const date_fns_1 = require("date-fns"); // Import date-fns for date parsing
const replaceNullsWithZero = (data) => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value === null || value === 'null' || value === 'nil' || value === 'Nil' || value === '-' ? null : value]));
};
const parseDate = (dateString) => {
    // Check for a specific placeholder indicating a null date
    if (dateString === '-' || dateString === null) {
        return null; // Return null if the input is '-'
    }
    // Updated formats to include only the desired formats
    const formats = ['dd-MM-yyyy', 'dd-MMM-yy',];
    // Attempt to parse the date string using the defined formats
    for (const formatString of formats) {
        const parsedDate = (0, date_fns_1.parse)(dateString, formatString, new Date());
        if ((0, date_fns_1.isValid)(parsedDate)) {
            // Return the date formatted as 'dd-MM-yyyy'
            return (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
        }
    }
    throw new Error(`Invalid date value: ${dateString}`);
};
const countNull = (data) => {
    return Object.values(data).filter(value => value === null).length;
};
function ProcessInsertionDatabase(stockDataArray) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config_1.default.begin((transaction) => __awaiter(this, void 0, void 0, function* () {
                for (const stockData of stockDataArray) {
                    const sanitizedData = replaceNullsWithZero(stockData);
                    // Skip if symbol is null
                    if (!sanitizedData.symbol) {
                        console.log(`Skipped insertion for stock data due to null symbol: ${JSON.stringify(sanitizedData)}`);
                        continue; // Skip to the next iteration
                    }
                    if (countNull(sanitizedData) > 4) {
                        console.log(`Skipped insertion for stock data due to null values: ${JSON.stringify(sanitizedData)}`);
                        continue; // Skip to the next iteration
                    }
                    console.log(sanitizedData);
                    // Parse and validate the date fields
                    const acquisitionDateFrom = parseDate(sanitizedData.acquisitionDateFrom);
                    const acquisitionDateTo = parseDate(sanitizedData.acquisitionDateTo);
                    const intimationDate = parseDate(sanitizedData.intimationDate);
                    // Insert the data into the database with the parsed dates
                    yield transaction `INSERT INTO transactions (
                    symbol, company, regulation, acquirerDisposer, categoryOfPerson, securityTypePrior, 
                    numOfSecurityPrior, shareholdingPrior, securityTypeAcquiredDisposed, 
                    numOfSecurityAcquiredDisposed, valueOfSecurityAcquiredDisposed, transactionType, 
                    securityTypePost, numOfSecurityPost, shareholdingPost, acquisitionDateFrom, 
                    acquisitionDateTo, intimationDate, modeOfAcquisition, derivativeTypeSecurity, 
                    derivativeContractSpecification, notionalValueBuy, numOfUnitsContractBuy, 
                    notionalValueSell, numOfUnitsContractSell, exchange, remark, 
                    broadcastDateTime, xbrl
                ) VALUES (
                    ${sanitizedData.symbol}, ${sanitizedData.company}, ${sanitizedData.regulation}, 
                    ${sanitizedData.acquirerDisposer}, ${sanitizedData.categoryOfPerson}, 
                    ${sanitizedData.securityTypePrior}, ${sanitizedData.numOfSecurityPrior}, 
                    ${sanitizedData.shareholdingPrior}, ${sanitizedData.securityTypeAcquiredDisposed}, 
                    ${sanitizedData.numOfSecurityAcquiredDisposed}, ${sanitizedData.valueOfSecurityAcquiredDisposed}, 
                    ${sanitizedData.transactionType}, ${sanitizedData.securityTypePost}, 
                    ${sanitizedData.numOfSecurityPost}, ${sanitizedData.shareholdingPost}, 
                    ${acquisitionDateFrom}, ${acquisitionDateTo}, 
                    ${intimationDate}, ${sanitizedData.modeOfAcquisition}, 
                    ${sanitizedData.derivativeTypeSecurity}, ${sanitizedData.derivativeContractSpecification}, 
                    ${sanitizedData.notionalValueBuy}, ${sanitizedData.numOfUnitsContractBuy}, 
                    ${sanitizedData.notionalValueSell}, ${sanitizedData.numOfUnitsContractSell}, 
                    ${sanitizedData.exchange}, ${sanitizedData.remark}, 
                    ${sanitizedData.broadcastDateTime}, ${sanitizedData.xbrl}
                )`;
                }
            }));
            console.log('All data inserted successfully');
        }
        catch (err) {
            console.error('Error during database insertion:', err);
            console.log(err.message);
            throw new Error(err); // Rethrow error to handle it at a higher level
        }
        finally {
            yield config_1.default.end(); // Ensure the connection is closed
        }
    });
}
//# sourceMappingURL=ProcessInsertion.js.map