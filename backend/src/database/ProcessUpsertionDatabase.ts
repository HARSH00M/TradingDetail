import sql from './config';




const columnMapping = {
  'Name': 'nseSymbol',
  'NSE Symbol': 'nseSymbol',
  'BSE Code': 'bseCode',
  '_id' : '_id',
  'Market Capitalization': 'marketCapitalization',
  'Close Price': 'closePrice',
  'Industry': 'industry',
  'Sector': 'sector',
  'Price To Earnings': 'priceToEarnings',
  'Price To Sales': 'priceToSales',
  'Revenue Growth TTM': 'revenueGrowthTtm',
  'PAT Growth TTM': 'patGrowthTtm',
  'PAT Growth QoQ': 'patGrowthQoq',
  'Price To Book Value': 'priceToBookValue',
  'Returns 1W': 'returns1W',
  'Returns 1M': 'returns1M',
  'Returns 3M': 'returns3M',
  'Returns 6M': 'returns6M',
  'Strength Vs Nifty 500 Monthly': 'strengthVsNifty500Monthly',
  'SMA 20D': 'sma20D',
  'EV To EBITDA': 'evToEbitda',
  'Fixed Assets 3 Years Back': 'fixedAssets3YearsBack',
  '52WH Distance': 'fiftyTwoWhDistance',
  '52WL': 'fiftyTwoWl',
  'Strength Vs Nifty 500 Weekly': 'strengthVsNifty500Weekly',
  'Debt To Equity': 'debtToEquity',
  'Debt To Equity 3 Years Back': 'debtToEquity3YearsBack',
  'Change In DII Holdings 1 Year': 'changeInDiiHoldings1Year',
  'Change In FII Holdings 1 Year': 'changeInFiiHoldings1Year',
  'Promoter Holdings': 'promoterHoldings',
  'Change In Promoter Holdings 1 Year': 'changeInPromoterHoldings1Year',
  'ROCE': 'roce',
  'PBT Growth TTM': 'pbtGrowthTtm',
  'Fixed Assets Latest Year': 'fixedAssetsLatestYear'
};


// Replace null values with zero
const replaceNullsWithZero = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value === null || value === 'null' ? 0 : value])
  );
};

// Transform CSV data to match database schema
const transformData = (csvData) => {
  return Object.fromEntries(
    Object.entries(csvData).map(([csvKey, value]) => [columnMapping[csvKey] || csvKey, value])
  );
};

// Process and upsert data into the database
export default async function ProcessUpsertionDatabase(stockDataArray) {
  try {
    // Use a transaction to ensure all data is inserted or none at all
    await sql.begin(async (transaction : any) => {
      for (const stockData of stockDataArray) {
        let transformedData = transformData(stockData);
        let sanitizedData = replaceNullsWithZero(transformedData);

        // Log data for debugging

        await transaction`INSERT INTO stockdata (
          nseSymbol, bseCode, _id, marketCapitalization, closePrice, industry, sector,
          priceToEarnings, priceToSales, revenueGrowthTtm, patGrowthTtm, patGrowthQoq,
          priceToBookValue, returns1W, returns1M, returns3M, returns6M, strengthVsNifty500Monthly,
          sma20D, evToEbitda, fixedAssets3YearsBack, fiftyTwoWhDistance, fiftyTwoWl,
          strengthVsNifty500Weekly, debtToEquity, debtToEquity3YearsBack,
          changeInDiiHoldings1Year, changeInFiiHoldings1Year, promoterHoldings,
          changeInPromoterHoldings1Year, roce, pbtGrowthTtm, fixedAssetsLatestYear
        ) VALUES (
          ${sanitizedData.nseSymbol}, ${sanitizedData.bseCode}, ${sanitizedData._id}, ${sanitizedData.marketCapitalization}, ${sanitizedData.closePrice}, ${sanitizedData.industry}, ${sanitizedData.sector},
          ${sanitizedData.priceToEarnings}, ${sanitizedData.priceToSales}, ${sanitizedData.revenueGrowthTtm}, ${sanitizedData.patGrowthTtm}, ${sanitizedData.patGrowthQoq},
          ${sanitizedData.priceToBookValue}, ${sanitizedData.returns1W}, ${sanitizedData.returns1M}, ${sanitizedData.returns3M}, ${sanitizedData.returns6M}, ${sanitizedData.strengthVsNifty500Monthly},
          ${sanitizedData.sma20D}, ${sanitizedData.evToEbitda}, ${sanitizedData.fixedAssets3YearsBack}, ${sanitizedData.fiftyTwoWhDistance}, ${sanitizedData.fiftyTwoWl},
          ${sanitizedData.strengthVsNifty500Weekly}, ${sanitizedData.debtToEquity}, ${sanitizedData.debtToEquity3YearsBack},
          ${sanitizedData.changeInDiiHoldings1Year}, ${sanitizedData.changeInFiiHoldings1Year}, ${sanitizedData.promoterHoldings},
          ${sanitizedData.changeInPromoterHoldings1Year}, ${sanitizedData.roce}, ${sanitizedData.pbtGrowthTtm}, ${sanitizedData.fixedAssetsLatestYear}
        )
        ON CONFLICT (_id) 
        DO UPDATE SET
          nseSymbol = EXCLUDED.nseSymbol,
          bseCode = EXCLUDED.bseCode,
          marketCapitalization = EXCLUDED.marketCapitalization,
          closePrice = EXCLUDED.closePrice,
          industry = EXCLUDED.industry,
          sector = EXCLUDED.sector,
          priceToEarnings = EXCLUDED.priceToEarnings,
          priceToSales = EXCLUDED.priceToSales,
          revenueGrowthTtm = EXCLUDED.revenueGrowthTtm,
          patGrowthTtm = EXCLUDED.patGrowthTtm,
          patGrowthQoq = EXCLUDED.patGrowthQoq,
          priceToBookValue = EXCLUDED.priceToBookValue,
          returns1W = EXCLUDED.returns1W,
          returns1M = EXCLUDED.returns1M,
          returns3M = EXCLUDED.returns3M,
          returns6M = EXCLUDED.returns6M,
          strengthVsNifty500Monthly = EXCLUDED.strengthVsNifty500Monthly,
          sma20D = EXCLUDED.sma20D,
          evToEbitda = EXCLUDED.evToEbitda,
          fixedAssets3YearsBack = EXCLUDED.fixedAssets3YearsBack,
          fiftyTwoWhDistance = EXCLUDED.fiftyTwoWhDistance,
          fiftyTwoWl = EXCLUDED.fiftyTwoWl,
          strengthVsNifty500Weekly = EXCLUDED.strengthVsNifty500Weekly,
          debtToEquity = EXCLUDED.debtToEquity,
          debtToEquity3YearsBack = EXCLUDED.debtToEquity3YearsBack,
          changeInDiiHoldings1Year = EXCLUDED.changeInDiiHoldings1Year,
          changeInFiiHoldings1Year = EXCLUDED.changeInFiiHoldings1Year,
          promoterHoldings = EXCLUDED.promoterHoldings,
          changeInPromoterHoldings1Year = EXCLUDED.changeInPromoterHoldings1Year,
          roce = EXCLUDED.roce,
          pbtGrowthTtm = EXCLUDED.pbtGrowthTtm,
          fixedAssetsLatestYear = EXCLUDED.fixedAssetsLatestYear;
      `;
      }
    });

    console.log('All data inserted successfully');
  } catch (err) {
    throw new Error(err);
  } finally {
    await sql.end(); // Ensure the connection is closed
  }
}

