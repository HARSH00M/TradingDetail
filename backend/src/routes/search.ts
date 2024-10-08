import { Router, Request, Response } from "express"
const router = Router()
import sql from '../database/config'


router.get('/search/:name', async (req: Request, res) => {
    const { name } = req.params

    const companies = await sql`
    SELECT DISTINCT Symbol, Company 
    FROM transactions 
    WHERE Company ILIKE ${name + '%'};
    `;




    // const searchByName = await sql`create table Book(id int primary key, name text, description text)`
    return res.json(companies)

})

router.get('/find', async (req: Request, res) => {
    const symbol = Array.isArray(req.query.symbol) ? req.query.symbol[0] : req.query.symbol;
    const company = Array.isArray(req.query.company) ? req.query.company[0] : req.query.company;

    // Check if the parameters are of type string, otherwise handle the error
    if (typeof symbol !== 'string' || typeof company !== 'string') {
        return res.status(400).json({ error: 'Invalid query parameters' });
    }

    try {
        const promoters = await sql`
            SELECT * FROM transactions 
            WHERE symbol=${symbol};
        `;
        const stock_Detail = await sql`SELECT * FROM stockdata WHERE _id=${symbol};`;


        res.json({
            promoters: promoters,
            stock: stock_Detail[0]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/allcompanies', async (req: Request, res) => {
    const { page } = req.query;


    let offsetFrom: number = 0;
    let offsetTo: number = 0;
    let perPage: number = 10;

    if (page) {
        offsetFrom = parseInt(page as string) * perPage;
        offsetTo = offsetFrom + perPage;
    }


    const allCompanies = await sql`
    SELECT DISTINCT Symbol, Company 
    FROM transactions ORDER BY company ASC LIMIT ${offsetTo} OFFSET ${offsetFrom};
    `;
    const totalvalues = await sql`SELECT COUNT(*) AS total_rows FROM transactions;`;
    const totalpages = Math.ceil(totalvalues[0].total_rows / perPage);


    const response = {
        allCompanies: allCompanies.slice(offsetFrom, offsetTo),
        pages: totalpages
    }

    res.json(response)
})

// router.get('/insert', async (req: Request, res) => {


//     try {
//         // await sql`drop table Transactions`;
//         const result = await sql`create table Transactions(
//             id SERIAL PRIMARY KEY,
//             symbol VARCHAR(255) NOT NULL,
//             company VARCHAR(255) NOT NULL,
//             acquirer_disposer_name VARCHAR(255),
//             category_of_person VARCHAR(255),
//             no_of_security_prior VARCHAR(255),
//             shareholding_prior_percentage VARCHAR(255),
//             no_of_securities_acquired_disposed VARCHAR(255),
//             value_of_security_acquired_disposed VARCHAR(255),
//             transaction_type VARCHAR(255),
//             type_of_security_post VARCHAR(255),
//             no_of_security_post VARCHAR(255),
//             post_shareholding_percentage VARCHAR(255),
//             allotment_acquisition_date_from VARCHAR(255),
//             allotment_acquisition_date_to VARCHAR(255),
//             initmation_to_company_date VARCHAR(255),
//             mode_of_acquisition VARCHAR(255),
//             exchange VARCHAR(255),
//             broadcast_date_time VARCHAR(255)
//         )`;
//         // const result = JSON.parse(response);
//     } catch (error) {
//         console.error('Connection error:', error);
//     } finally {
//         await sql.end(); // Close the connection
//         console.log('Connection closed.');
//         res.json({ message: 'Connection closed.' });
//     }

// })







export default router;

