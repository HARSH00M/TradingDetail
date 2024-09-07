import { Router, Request, Response } from "express";
import fs from 'fs'
export const router = Router()
import csv from 'csv-parser';





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

// Define the type for the extracted data
type CsvData = {
    [key: string]: string;
};

// Endpoint to get the CSV data
router.get('/data', (req: Request, res: Response) => {
    const results: CsvData[] = [];

    fs.createReadStream('./src/files/data.csv') // Replace 'data.csv' with the path to your CSV file
        .pipe(csv())
        .on('data', (row: CsvData) => {

            const filteredRow: CsvData = {};
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


