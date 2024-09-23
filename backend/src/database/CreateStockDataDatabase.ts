import sql from './config'

export default async function CreateStockDataDatabase() {
      await sql`CREATE TABLE stockData (
        nseSymbol VARCHAR(255),
          bseCode VARCHAR(255),
          _id VARCHAR(255) PRIMARY KEY,
          marketCapitalization NUMERIC,
          closePrice NUMERIC,
          industry VARCHAR(255),
          sector VARCHAR(255),
          priceToEarnings NUMERIC,
          priceToSales NUMERIC,
          revenueGrowthTtm NUMERIC,
          patGrowthTtm NUMERIC,
          patGrowthQoq NUMERIC,
          priceToBookValue NUMERIC,
          returns1W NUMERIC,
          returns1M NUMERIC,
          returns3M NUMERIC,
          returns6M NUMERIC,
          strengthVsNifty500Monthly NUMERIC,
          sma20D NUMERIC,
          evToEbitda NUMERIC,
          fixedAssets3YearsBack NUMERIC,
          fiftyTwoWhDistance NUMERIC,
          fiftyTwoWl NUMERIC,
          strengthVsNifty500Weekly NUMERIC,
          debtToEquity NUMERIC,
          debtToEquity3YearsBack NUMERIC,
          changeInDiiHoldings1Year NUMERIC,
          changeInFiiHoldings1Year NUMERIC,
          promoterHoldings NUMERIC,
          changeInPromoterHoldings1Year NUMERIC,
          roce NUMERIC,
          pbtGrowthTtm NUMERIC,
          fixedAssetsLatestYear NUMERIC
        )`
  }
  