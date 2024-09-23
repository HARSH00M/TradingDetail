import express, { Request, Response } from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

import sql from '../config/dbConnection';

async function CreateDatabase() {
  

   
    try {
        // await sql`drop table Transactions`;
        const result = await sql`CREATE TABLE market_data (
            
            nse_symbol VARCHAR(255),
            bse_code VARCHAR(255),
            _id VARCHAR(255),
            market_capitalization VARCHAR(255),
            close_price VARCHAR(255),
            industry VARCHAR(255),
            sector VARCHAR(255),
            price_to_earnings VARCHAR(255),
            price_to_sales VARCHAR(255),
            revenue_growth_ttm VARCHAR(255),
            pat_growth_ttm VARCHAR(255),
            pat_growth_qoq VARCHAR(255),
            price_to_book_value VARCHAR(255),
            returns_1w VARCHAR(255),
            returns_1m VARCHAR(255),
            returns_3m VARCHAR(255),
            returns_6m VARCHAR(255),
            strength_vs_nifty_500_monthly VARCHAR(255),
            sma_20d VARCHAR(255),
            ev_to_ebitda VARCHAR(255),
            fixed_assets_3_years_back VARCHAR(255),
            _52wh_distance VARCHAR(255),
            _52wl VARCHAR(255),
            strength_vs_nifty_500_weekly VARCHAR(255),
            debt_to_equity VARCHAR(255),
            debt_to_equity_3_years_back VARCHAR(255),
            change_in_dii_holdings_1_year VARCHAR(255),
            change_in_fii_holdings_1_year VARCHAR(255),
            promoter_holdings VARCHAR(255),
            change_in_promoter_holdings_1_year VARCHAR(255),
            roce VARCHAR(255),
            pbt_growth_ttm VARCHAR(255),
            fixed_assets_latest_year VARCHAR(255),
            id SERIAL PRIMARY KEY
        );`;
        console.log(result?.length)
        console.log('Database created successfully');
       
    } catch (error) {
        console.error('Connection error:', error);
    } 

}

type CsvRow = {
  symbol : string,
  [key: string]: string;
};


export async function upsertData(row) {
  const { symbol, ...columns } = row;

  // Remove 'Name' or 'name' from the row if present
  delete columns['Name'];
  delete columns['name'];

  // Prepare column names and their associated values
  const columnNames = Object.keys(columns).map(col => `"${col}"`).join(', ');
  const columnValues = Object.values(columns);

  // Construct dynamic column update values for conflict resolution
  const updateColumns = Object.keys(columns)
    .map(col => `"${col}" = EXCLUDED."${col}"`)
    .join(', ');

  // Prepare the values array with the symbol first
  const values = [symbol, ...columnValues];

  // Construct the SQL query string

  try {
    await sql`
    INSERT INTO market_data (symbol, ${columnNames})
    VALUES (${columnValues.map((_, i) => `$${i + 2}`).join(', ')})
    ON CONFLICT (symbol)
    DO UPDATE SET ${updateColumns}
  `;
    console.log('Upsert successful');
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

