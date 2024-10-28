"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCsv = processCsv;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
function run(filepath) {
    return new Promise((resolve, reject) => {
        const result = [];
        fs_1.default.createReadStream(filepath, { encoding: "utf-8" })
            .pipe((0, csv_parser_1.default)())
            .on("data", (chunk) => {
            delete chunk['Name']; // Remove 'Name' column if present
            result.push(chunk); // Push each processed chunk into the result array
        })
            .on("error", (error) => {
            reject(error); // Reject the promise if there’s an error
        })
            .on("end", () => {
            resolve(result); // Resolve the promise once the stream ends
        });
    });
}
// Updated processCsv function:
function processCsv(filename) {
    // Return the promise chain so the caller can handle it
    return run(filename)
        .then((data) => {
        return data; // Return the processed data from the CSV
    })
        .catch((err) => {
        console.log("Error processing CSV:", err);
        throw err; // Rethrow the error to be handled by the caller
    });
}
//# sourceMappingURL=csvfile.js.map