const sql = require('./config')


async function test() {
    const query = await sql`select * from stock_data;`;
    return query;
}

test().then((data)=>console.log(data)).catch(err=>console.log(err));