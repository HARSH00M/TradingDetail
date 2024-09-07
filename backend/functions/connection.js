
const postgres = require('postgres');
const sql = postgres({
    host : 'localhost',
    port : 5432,
    database : 'postgres',            // Name of database to connect to
    username : 'postgres',            // Username of database user
    password : 'User@890'
}) // will use psql environment variables

module.exports = sql;