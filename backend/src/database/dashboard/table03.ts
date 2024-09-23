import sql from '../config'

export async function MaximumNumbersOfTransactionsCompanyWise() {
    try {
        const result = await sql`SELECT Symbol AS company, 
            SUM(CAST(value_of_security_acquired_disposed AS numeric)) AS total_value
            FROM transactions
            WHERE value_of_security_acquired_disposed ~ '^[0-9]+(\.[0-9]+)?$'
            GROUP BY Symbol
            HAVING SUM(CAST(value_of_security_acquired_disposed AS numeric)) > 0
            ORDER BY total_value DESC;
 `

        return result;
    } catch (err) {
        console.log(err)
        console.log(err.message)
        throw new Error("Error in fetching Maximum Numbers Of Transactions Company Wise")
    }
}