import sql from '../config'

export async function MaximumNumbersOfTransactionsSectorWise() {
    try {
        const result = await sql`SELECT sector, 
        SUM(CAST(valueofsecurityacquireddisposed AS numeric)) AS total_value
        FROM transactions GROUP BY sector
        HAVING SUM(CAST(valueofsecurityacquireddisposed AS numeric)) > 0
        ORDER BY total_value DESC;
         `

        return result;
    } catch (err) {
        throw new Error("Error in fetching Maximum Numbers Of Transactions Sector Wise")
    }
}