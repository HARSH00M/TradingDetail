
const postgres = require('postgres');

// const sql = postgres("postgresql://user007:TGznJxDctmRW7EYyJq7a1YhA4SIfxdSW@dpg-cre2q2tsvqrc73fddrng-a.oregon-postgres.render.com/postgres007", {
//     port : 5432,
// })
const sql = require('postgres')({
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE_NAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    ssl: { rejectUnauthorized: false },
    idle_timeout: 10,  // Close idle connections after 10 seconds
    max_lifetime: 60,  // Close connections older than 60 seconds
});// will use psql environment variables

module.exports = sql;


