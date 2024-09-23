import sql from '../config'

export async function MaximumNumbersOfTransactionsSectorWise() {
    try {
        const result = await sql`SELECT sector, 
            SUM(CAST(value_of_security_acquired_disposed AS numeric)) AS total_value
            FROM transactions
            WHERE value_of_security_acquired_disposed ~ '^[0-9]+(\.[0-9]+)?$'
            GROUP BY sector
            HAVING SUM(CAST(value_of_security_acquired_disposed AS numeric)) > 0
            ORDER BY total_value DESC;
         `

        return result;
    } catch (err) {
        throw new Error("Error in fetching Maximum Numbers Of Transactions Sector Wise")
    }
}