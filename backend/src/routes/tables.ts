import { Router, Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser';
import { processCsv } from "../MulterCsvHandeling/csvfile";
import processUpsertionDatabase  from "../database/ProcessUpsertionDatabase";
import upload from "../MulterCsvHandeling/main";
import  processfilename  from "../MulterCsvHandeling/ProcessFileAddress";
import CreateStockDataDatabase from "../database/CreateStockDataDatabase";
import sql from '../database/config'
import { PerformTransactionUpdation } from "../database/TransactionUpdation";

type CsvData = {
  [key: string]: string;
};


export const router = Router()


  
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


router.post('/upload', upload(), async (req : Request, res : Response) => {

  try{

    const filepath = processfilename(req.generatedFilename); 
    const result = await processCsv(filepath)
    const upsert = await processUpsertionDatabase(result);
    
    res.json({
      filename: req.generatedFilename,
      upsert : upsert
    });
  }catch(error){
    res.json({
      error : error,
      message : error.message
    })
  }

  
});

router.get('/createstockdatabase',async (req, res)=>{
  try{

    const result = await CreateStockDataDatabase();

    res.json({
      result : result,
      message : "Created Stock Database"
    })
    
  }catch(err){
    console.log(err)
    res.json({
      error : err,
      message : err.message
    })
  }
  
})

router.get('/transactionupdation', async (req, res)=>{
  try{
    const data = await PerformTransactionUpdation();
    res.json({
      data : data,
      message : "Updated transactions table"
    });
    
  }catch(error) {
    res.json({
      message : error.message,
      error : error
    })
  } finally{
    sql.end();
  }
}
)

router.get('/query', async (req : Request, res)=>{
  try{
    const {query} = req.body;
    console.log(query)
    const result = await sql`SELECT industry, COUNT(acquirer_disposer_name) AS total_acquirer_disposer
    FROM transactions
    GROUP BY industry;
    `;

    res.json({
      query : result,
    });
    
  }catch(err){
    console.log(err)
    res.json({
      error : err,
      message : err.message
    })
  }
})

router.get('/delete', async (req, res)=>{
  try{
    const query = await sql`select * from stockdata;`;
    res.json({
      query : query,
    });
    
  }catch(error) {
    res.json({
      message : error.message,
      error : error
    })
  } finally{
    sql.end();
  }


})
export default router;



  


