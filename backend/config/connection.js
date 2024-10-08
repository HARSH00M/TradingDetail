
const postgres = require('postgres');
console.log(process.env.HOST, process.env.DB_PORT, process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD)
const sql = postgres({
    host : process.env.HOST,
    port : parseInt(process.env.DB_PORT),            // Port of database server
    database : process.env.DATABASE_NAME,            // Name of database to connect to
    username : process.env.USERNAME,            // Username of database user
    password : process.env.PASSWORD
}) // will use psql environment variables

module.exports = sql;