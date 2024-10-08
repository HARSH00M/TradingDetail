import { Router, Request, Response, query } from "express"
const router = Router()
import sql from '../database/config'
import { PerformTransactionUpdation } from "../database/TransactionUpdation";
import { MaximumNumbersOfTransactionsCompanyWise } from "../database/dashboard/table03";
import { MaximumNumbersOfTransactionsIndustryWise } from "../database/dashboard/table01";
import { MaximumNumbersOfTransactionsSectorWise } from "../database/dashboard/table02";

router.post('/find', async (req: Request, res) => {
    const { from, to, securitytype = null, modeofacquisition = null,transactiontype  = null  } = req.body;
    // const from = "2024-06-01";
    // const to = "2024-06-02"
    // Check if 'from' and 'to' are of correct type
    if (typeof from !== 'string' || typeof to !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "from" or "to" query parameters' });
    }

    try {
        const data = await sql`
            SELECT * FROM transactions 
            WHERE acquisitiondateto BETWEEN ${from} AND ${to}
            ${securitytype ? sql`AND securitytypeprior = ${securitytype}` : sql``}
            ${transactiontype ? sql`AND transactiontype = ${transactiontype}` : sql``}
            ${modeofacquisition ? sql`AND modeofacquisition = ${modeofacquisition}` : sql``}
            ORDER BY acquisitiondateto DESC;
        `;

        res.json( data );
    } catch (error) {
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


router.get('/performtransactionupdation',async (req, res)=>{
    try{
        await PerformTransactionUpdation();
        res.json({
            message : 'updation done industry column added'
        })

    }catch(error){
        throw error;
    }
})
router.get('/dashboard', async (req: Request, res) => {

    try{
        const data1 = await MaximumNumbersOfTransactionsIndustryWise()
        const data2 = await MaximumNumbersOfTransactionsSectorWise()
        const data3 = await MaximumNumbersOfTransactionsCompanyWise()
        
        res.json({
            data1 : data1, data2 : data2, data3 : data3
        })
    }catch(err){
        res.json({
            error : err,
            message : err.message
        })
    }

})


router.get('/', async (req: Request, res) => {   
    res.send("working")
})

export default router

