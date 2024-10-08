import sql from '../config'

export async function MaximumNumbersOfTransactionsIndustryWise() {
    try {
        const result = await sql`SELECT industry, 
        SUM(CAST(valueofsecurityacquireddisposed AS numeric)) AS total_value
 FROM transactions GROUP BY industry
 HAVING SUM(CAST(valueofsecurityacquireddisposed AS numeric)) > 0
 ORDER BY total_value DESC;`

        return result;
    } catch (err) {
        console.log(err.message)
        throw new Error("Error in fetching Maximum Numbers Of Transactions Industry Wise")
    }
}