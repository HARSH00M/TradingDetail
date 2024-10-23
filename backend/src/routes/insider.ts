import { Router, Request, Response } from "express"
const router = Router()
import sql from '../database/config'
import { PerformTransactionUpdation } from "../database/TransactionUpdation";
import { MaximumNumbersOfTransactionsCompanyWise } from "../database/dashboard/table03";
import { MaximumNumbersOfTransactionsIndustryWise } from "../database/dashboard/table01";
import { MaximumNumbersOfTransactionsSectorWise } from "../database/dashboard/table02";
import { named_wise } from "../database/queries/promoters/name_wise";




const namewise = (from : string, to : string) => sql`WITH LatestHoldings AS (
    SELECT 
        acquirerdisposer,
        symbol,
        company,
        shareholdingprior,
        shareholdingpost,
        acquisitiondatefrom,
        ROW_NUMBER() OVER (PARTITION BY acquirerdisposer ORDER BY acquisitiondatefrom DESC) AS rn
    FROM 
        transactions
)

SELECT 
    t.acquirerdisposer,
    lh.symbol,
    lh.company,
	t.categoryofperson,
	t.securitytypeprior,
	t.transactiontype ,
	TO_CHAR(lh.acquisitiondatefrom, 'DD-MM-YYYY') AS latest_acquisitiondatefrom,
    SUM(t.numofsecurityacquireddisposed) AS totalnumofsecurity,
    SUM(t.valueofsecurityacquireddisposed) AS totalvalueofsecurity,
    lh.shareholdingprior,
    lh.shareholdingpost,
    (lh.shareholdingpost - lh.shareholdingprior) AS holding_difference,
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
FROM 
    transactions t
JOIN 
    LatestHoldings lh ON t.acquirerdisposer = lh.acquirerdisposer AND lh.rn = 1
JOIN 
    stockdata s ON t.symbol = s.nsesymbol
WHERE 
    t.acquisitiondatefrom BETWEEN ${from} AND ${to}
    AND t.categoryofperson IN ('Director', 'Promoter Group', 'Promoters')
    AND t.securitytypeprior IN ('Equity Shares', 'Warrent')
    AND t.transactiontype = 'Buy'
GROUP BY 
    t.acquirerdisposer, lh.symbol, lh.company,t.categoryofperson, t.securitytypeprior, t.transactiontype, lh.acquisitiondatefrom, 
    lh.shareholdingprior, lh.shareholdingpost, 
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
	ORDER BY 
    t.acquirerdisposer ASC

`

// const companywise = (from : string, to : string) => sql`
// WITH LatestHoldings AS (
//     SELECT 
//         symbol,
//         company,
//         acquisitiondatefrom,
//         shareholdingprior,
//         shareholdingpost,
//         ROW_NUMBER() OVER (PARTITION BY symbol, company ORDER BY acquisitiondatefrom DESC) AS rn
//     FROM 
//         transactions
//     WHERE 
//         acquisitiondatefrom BETWEEN ${from} AND ${to}
//         AND categoryofperson IN ('Director', 'Promoter Group', 'Promoters')
//         AND securitytypeprior IN ('Equity Shares', 'Warrent')
//         AND transactiontype = 'Buy'
// )

// SELECT 
//     lh.symbol,
//     lh.company,
//     SUM(t.numofsecurityacquireddisposed) AS totalnumofsecurity,
//     SUM(t.valueofsecurityacquireddisposed) AS totalvalueofsecurity,
//     (SELECT shareholdingprior FROM LatestHoldings WHERE rn = 1 AND symbol = lh.symbol AND company = lh.company) AS total_shareholdingprior,
//     (SELECT shareholdingpost FROM LatestHoldings WHERE rn = 1 AND symbol = lh.symbol AND company = lh.company) AS total_shareholdingpost,
//     (SELECT shareholdingpost FROM LatestHoldings WHERE rn = 1 AND symbol = lh.symbol AND company = lh.company) - (SELECT shareholdingprior FROM LatestHoldings WHERE rn = 1 AND symbol = lh.symbol AND company = lh.company) AS holding_difference,
//     s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear,
//     TO_CHAR(MAX(t.acquisitiondatefrom), 'DD-MM-YYYY') AS latest_acquisition_date
// FROM 
//     transactions t
// JOIN 
//     LatestHoldings lh ON t.symbol = lh.symbol AND t.company = lh.company
// JOIN 
//     stockdata s ON t.symbol = s.nsesymbol
// WHERE 
//     t.acquisitiondatefrom BETWEEN ${from} AND ${to}
//     AND t.categoryofperson IN ('Director', 'Promoter Group', 'Promoters')
//     AND t.securitytypeprior IN ('Equity Shares', 'Warrent')
//     AND t.transactiontype = 'Buy'
// GROUP BY 
//     lh.symbol, lh.company, 
//     s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
// ORDER BY 
//     latest_acquisition_date DESC;


// `

const companywise = (from : string, to : string) => sql`
WITH LatestShareholding AS (
    SELECT 
        categoryOfPerson,
        symbol, 
        company,
        acquisitionDateFrom,
        shareholdingPrior,
        shareholdingPost,
        ROW_NUMBER() OVER (
            PARTITION BY company 
            ORDER BY ABS(acquisitionDateFrom - ${to}::date)
        ) AS rn,
        SUM(numOfSecurityAcquiredDisposed) OVER (PARTITION BY company) AS total_num_of_security_acquired_disposed,
        SUM(valueOfSecurityAcquiredDisposed) OVER (PARTITION BY company) AS total_value_of_security_acquired_disposed,
        MAX(shareholdingPrior) OVER (PARTITION BY company) AS latest_shareholdingPrior,
        MAX(shareholdingPost) OVER (PARTITION BY company) AS latest_shareholdingPost
    FROM 
        transactions
    WHERE 
        categoryOfPerson IN ('Director', 'Promoters', 'Promoter group') AND
        transactionType = 'Buy' 
        AND acquisitionDateFrom BETWEEN ${from} AND ${to}
)

SELECT 
    ts.categoryOfPerson,
    ts.symbol,
    ts.company,
    TO_CHAR(ts.acquisitionDateFrom, 'DD-MM-YYYY') AS latest_acquisitiondatefrom,
    ts.latest_shareholdingPrior,
    ts.latest_shareholdingPost,
    (ts.latest_shareholdingPost - ts.latest_shareholdingPrior) AS shareholding_difference,
    ts.total_num_of_security_acquired_disposed,
    ts.total_value_of_security_acquired_disposed,
    sd.nseSymbol,
    sd.bseCode,
    sd.marketCapitalization,
    sd.closePrice,
    sd.industry,
    sd.sector,
    sd.priceToEarnings,
    sd.priceToSales,
    sd.revenueGrowthTtm,
    sd.patGrowthTtm,
    sd.patGrowthQoq,
    sd.priceToBookValue,
    sd.returns1W,
    sd.returns1M,
    sd.returns3M,
    sd.returns6M,
    sd.strengthVsNifty500Monthly,
    sd.sma20D,
    sd.evToEbitda,
    sd.fixedAssets3YearsBack,
    sd.fiftyTwoWhDistance,
    sd.fiftyTwoWl,
    sd.strengthVsNifty500Weekly,
    sd.debtToEquity,
    sd.debtToEquity3YearsBack,
    sd.changeInDiiHoldings1Year,
    sd.changeInFiiHoldings1Year,
    sd.promoterHoldings,
    sd.changeInPromoterHoldings1Year,
    sd.roce,
    sd.pbtGrowthTtm,
    sd.fixedAssetsLatestYear
FROM 
    LatestShareholding ts
LEFT JOIN 
    stockdata sd ON ts.symbol = sd.nseSymbol
WHERE 
    ts.rn = 1
ORDER BY 
    ts.acquisitionDateFrom ASC;
`


const namecombined = (from : string, to : string) => sql`WITH LatestHoldings AS (
    SELECT 
        acquirerdisposer,
        symbol,
        company,
        shareholdingprior,
        shareholdingpost,
        acquisitiondatefrom,
        ROW_NUMBER() OVER (PARTITION BY acquirerdisposer ORDER BY acquisitiondatefrom DESC) AS rn
    FROM 
        transactions
)

SELECT 
    t.acquirerdisposer,
    lh.symbol,
    lh.company,
	t.categoryofperson,
	t.securitytypeprior,
	t.transactiontype ,
	TO_CHAR(lh.acquisitiondatefrom, 'DD-MM-YYYY') AS latest_acquisitiondatefrom,
    SUM(t.numofsecurityacquireddisposed) AS totalnumofsecurity,
    SUM(t.valueofsecurityacquireddisposed) AS totalvalueofsecurity,
    lh.shareholdingprior,
    lh.shareholdingpost,
    (lh.shareholdingpost - lh.shareholdingprior) AS holding_difference,
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
FROM 
    transactions t
JOIN 
    LatestHoldings lh ON t.acquirerdisposer = lh.acquirerdisposer AND lh.rn = 1
JOIN 
    stockdata s ON t.symbol = s.nsesymbol
WHERE 
    t.acquisitiondatefrom BETWEEN ${from} AND ${to}
    AND t.categoryofperson IN ('Director', 'Promoter Group', 'Promoters')
    AND t.securitytypeprior IN ('Equity Shares', 'Warrent')
    AND t.transactiontype = 'Buy'
GROUP BY 
    t.acquirerdisposer, lh.symbol, lh.company,t.categoryofperson, t.securitytypeprior, t.transactiontype, lh.acquisitiondatefrom, 
    lh.shareholdingprior, lh.shareholdingpost, 
    s.nsesymbol, s.bsecode, s._id, s.marketcapitalization, s.closeprice, s.industry, s.sector, s.pricetoearnings, s.pricetosales, s.revenuegrowthttm, s.patgrowthttm, s.patgrowthqoq, s.pricetobookvalue, s.returns1w, s.returns1m, s.returns3m, s.returns6m, s.strengthvsnifty500monthly, s.sma20d, s.evtoebitda, s.fixedassets3yearsback, s.fiftytwowhdistance, s.fiftytwowl, s.strengthvsnifty500weekly, s.debttoequity, s.debttoequity3yearsback, s.changeindiiholdings1year, s.changeinfiiholdings1year, s.promoterholdings, s.changeinpromoterholdings1year, s.roce, s.pbtgrowthttm, s.fixedassetslatestyear
	ORDER BY 
    lh.company asc
	`

router.post('/namewise', async (req: Request, res) => {
    let {amountfrom, amountto, from, to, securitytype = null, modeofacquisition = null, transactiontype = null } = req.body;
    console.log(from, to)
    if (!from && !to) {
        from = "2024-08-11";
        to = "2024-09-11"
    }
    
    // Check if 'from' and 'to' are of correct type
    if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "from" or "to" query parameters' });
    }  
    
    try {
        const data = await namewise(from, to);
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/namecombined', async (req: Request, res) => {
    let {amountfrom, amountto, from, to, securitytype = null, modeofacquisition = null, transactiontype = null } = req.body;
    console.log(from, to)
    if (!from && !to) {
        from = "2024-08-11";
        to = "2024-09-11"
    }
    
    // Check if 'from' and 'to' are of correct type
    if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "from" or "to" query parameters' });
    }  
    
    try {
        const data = await namecombined(from, to);
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/companywise', async (req: Request, res) => {
    let {amountfrom, amountto, from, to, securitytype = null, modeofacquisition = null, transactiontype = null } = req.body;
    console.log(from, to)
    if (!from && !to) {
        from = "2024-09-23";
        to = "2024-10-23"
    }
    
    // Check if 'from' and 'to' are of correct type
    if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "from" or "to" query parameters' });
    }  
    

    try {
        console.log(from, to)
        const data = await companywise(from, to);
        res.json({
            between : [from, to],
            data : data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/filtervalues', async (req: Request, res) => {
    try {
        const securitytypeData = await sql`
            SELECT DISTINCT securitytypeprior FROM transactions;
        `;
        const modeofacquisitionData = await sql`
            SELECT DISTINCT modeofacquisition FROM transactions;
        `;
        const transactiontypeData = await sql`
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
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/performtransactionupdation', async (req, res) => {
    try {
        await PerformTransactionUpdation();
        res.json({
            message: 'updation done industry column added'
        })

    } catch (error) {
        throw error;
    }
})

router.get('/dashboard', async (req: Request, res) => {

    try {
        const data1 = await MaximumNumbersOfTransactionsIndustryWise()
        const data2 = await MaximumNumbersOfTransactionsSectorWise()
        const data3 = await MaximumNumbersOfTransactionsCompanyWise()

        res.json({
            data1: data1, data2: data2, data3: data3
        })
    } catch (err) {
        res.json({
            error: err,
            message: err.message
        })
    }

})

router.get('/', async (req: Request, res) => {
    res.send("working")
})

router.get('/stock', async (req, res)=>{
    try{
        const data = await sql`select * from stockdata limit 10;`;
        res.json(data);
    }catch(error){
        console.log(error)
        res.json(error);
    }
})

export default router







// sql`SELECT *, 
//         TO_CHAR(acquisitiondatefrom, 'YYYY-MM-DD') AS formatted_acquisitiondatefrom,
//         TO_CHAR(acquisitiondateto, 'YYYY-MM-DD') AS formatted_acquisitiondateto,
//         TO_CHAR(intimationdate, 'YYYY-MM-DD') AS formatted_intimationdate
//         FROM transactions
//         WHERE acquisitiondatefrom BETWEEN ${from} AND ${to}
//         ORDER BY acquisitiondatefrom DESC; 
//         `;

// ${(amountfrom && amountto) ? sql`AND valueofsecurityacquireddisposed > ${amountfrom} AND valueofsecurityacquireddisposed < ${amountto}` : sql``}
// ${securitytype && securitytype.length>0 ? sql`AND securitytypepost IN ${sql(securitytype)}` : sql``}
// ${transactiontype && transactiontype.length>0 ? sql`AND transactiontype IN ${sql(transactiontype)}` : sql``}
// ${modeofacquisition && modeofacquisition.length>0 ? sql`AND modeofacquisition IN ${sql(modeofacquisition)}` : sql``}
