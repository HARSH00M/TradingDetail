import postgres from "postgres"

const sql = postgres({
    host : 'localhost', // Host of database server
    port : 5432,            // Port of database server
    database : 'Database',            // Name of database to connect to
    username : 'postgres',            // Username of database user
    password : 'User@890',
    // ssl: { rejectUnauthorized: false }
}) // will use psql environment variables

export default sql