

import sql from './config'

export async function PerformTransactionUpdation() {
    try{
        // const wait1 = await sql`ALTER TABLE transactions ADD COLUMN industry VARCHAR;`
        // const wait2 = await sql`ALTER TABLE transactions ADD COLUMN sector VARCHAR;`

        // if(wait1)
        //     console.log("Added industry column to transactions table")
        // if(wait2)
        //     console.log("Added sector column to transactions table")


        const data = await sql`UPDATE transactions t SET "industry" = s.industry, "sector" = s.sector FROM stockdata s WHERE t.symbol = s.nsesymbol`;
        if(data)
        console.log("Updated transactions table with industry and sector");

        return data;
        
    }catch(err){
        throw new Error(err.message)
    }
}