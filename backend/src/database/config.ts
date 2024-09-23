// const pg = require('pg');
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE, process.env.DB_PORT)

export default postgres({
    host: process.env.HOST,         // e.g., localhost or a remote host
    user: process.env.USER,     // e.g., postgres
    password: process.env.PASSWORD, // e.g., your database password
    database: process.env.DATABASE, // e.g., the name of your database
    port: parseInt(process.env.DB_PORT),  
    ssl: { rejectUnauthorized: false },              
  });


  // export default postgres({
  //   host: 'localhost',         // e.g., localhost or a remote host
  //   user: 'postgres',     // e.g., postgres
  //   password: 'User@890', // e.g., your database password
  //   database: 'Database', // e.g., the name of your database
  //   port: 5432,  
  //   // ssl: { rejectUnauthorized: false },              
  // });

