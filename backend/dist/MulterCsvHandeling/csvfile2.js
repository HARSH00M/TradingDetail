"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCsvforTF = processCsvforTF;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const newColumnNames = [
    'symbol',
    'company',
    'regulation',
    'acquirerDisposer',
    'categoryOfPerson',
    'securityTypePrior',
    'numOfSecurityPrior',
    'shareholdingPrior',
    'securityTypeAcquiredDisposed',
    'numOfSecurityAcquiredDisposed',
    'valueOfSecurityAcquiredDisposed',
    'transactionType',
    'securityTypePost',
    'numOfSecurityPost',
    'shareholdingPost',
    'acquisitionDateFrom',
    'acquisitionDateTo',
    'intimationDate',
    'modeOfAcquisition',
    'derivativeTypeSecurity',
    'derivativeContractSpecification',
    'notionalValueBuy',
    'numOfUnitsContractBuy',
    'notionalValueSell',
    'numOfUnitsContractSell',
    'exchange',
    'remark',
    'broadcastDateTime',
    'xbrl'
];
function run(filepath) {
    return new Promise((resolve, reject) => {
        // Result array to hold the mapped objects
        const result = [];
        // Read the CSV file
        fs_1.default.createReadStream(filepath) // Use the provided filepath
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            // Create a new object for each row
            const mappedRow = {};
            newColumnNames.forEach((key, index) => {
                mappedRow[key] = row[Object.keys(row)[index]]; // Map old keys to new names
            });
            result.push(mappedRow);
            // console.log(mappedRow) // Push the mapped object to result array
        })
            .on('end', () => {
            resolve(result); // Resolve the promise with the result array
        })
            .on('error', (error) => {
            reject(error); // Reject the promise on error
        });
    });
}
// Updated processCsv function:
function processCsvforTF(filename) {
    return run(filename)
        .then((data) => {
        return data; // Return the processed data from the CSV
    })
        .catch((err) => {
        console.log("Error processing CSV:", err);
        throw err; // Rethrow the error to be handled by the caller
    });
}
//# sourceMappingURL=csvfile2.js.map