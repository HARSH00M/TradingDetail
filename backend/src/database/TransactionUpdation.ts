

import sql from './config'

export async function PerformTransactionUpdation() {
    try{
        // await sql`ALTER TABLE transactions ADD COLUMN industry VARCHAR;`
        // await sql`ALTER TABLE transactions ADD COLUMN sector VARCHAR;`

        console.log("Updated transactions table")

        const data = await sql`UPDATE transactions t SET "industry" = s.industry, "sector" = s.sector FROM stockdata s WHERE t.symbol = s.nsesymbol`;

        console.log("Updated transactions table with industry and sector")
        return data
        
    }catch(err){
        throw new Error(err.message)
    }
}