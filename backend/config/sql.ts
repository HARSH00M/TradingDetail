

// import fs from 'fs';
// import csv from 'csv-parser';
// // '"SYMBOL \n"',
// // 'COMPANY \n',
// // 'REGULATION \n',
// // 'NAME OF THE ACQUIRER/DISPOSER \n',
// // 'CATEGORY OF PERSON \n',
// // 'TYPE OF SECURITY (PRIOR) \n',
// // 'NO. OF SECURITY (PRIOR) \n',
// // '% SHAREHOLDING (PRIOR) \n',
// // 'TYPE OF SECURITY (ACQUIRED/DISPLOSED) \n',
// // 'NO. OF SECURITIES (ACQUIRED/DISPLOSED) \n',
// // 'VALUE OF SECURITY (ACQUIRED/DISPLOSED) \n',
// // 'ACQUISITION/DISPOSAL TRANSACTION TYPE \n',
// // 'TYPE OF SECURITY (POST) \n',
// // 'NO. OF SECURITY (POST) \n',
// // '% POST \n',
// // 'DATE OF ALLOTMENT/ACQUISITION FROM \n',
// // 'DATE OF ALLOTMENT/ACQUISITION TO \n',
// // 'DATE OF INITMATION TO COMPANY \n',
// // 'MODE OF ACQUISITION \n',
// // 'DERIVATIVE TYPE SECURITY \n',
// // 'DERIVATIVE CONTRACT SPECIFICATION \n',
// // 'NOTIONAL VALUE(BUY) \n',
// // 'NUMBER OF UNITS/CONTRACT LOT SIZE (BUY) \n',
// // 'NOTIONAL VALUE(SELL) \n',
// // 'NUMBER OF UNITS/CONTRACT LOT SIZE  (SELL) \n',
// // 'EXCHANGE \n',
// // 'REMARK \n',
// // 'BROADCASTE DATE AND TIME \n',
// // 'XBRL \n



// require('dotenv').config();

// // const sql = require('./dbConnection');
// import sql from './dbConnection';


// // async function InsertColumn() {
// //     // values[0],
// //     // values[1],
// //     // values[3],
// //     // values[4],
// //     // values[5],
// //     // values[6],
// //     // values[12],
// //     // values[13],
// //     // values[14])
// //     try {
// //         // await sql`drop table Transactions`;
// //         const result = await sql`create table Transactions(
// //         symbol VARCHAR(255) ,
// //         company VARCHAR(255) ,
// //         acquirer_disposer_name VARCHAR(255),
// //         category_of_person VARCHAR(255),
// //         no_of_security_prior VARCHAR(255),
// //         shareholding_prior_percentage VARCHAR(255),
// //         no_of_securities_acquired_disposed VARCHAR(255),
// //         value_of_security_acquired_disposed VARCHAR(255),
// //         transaction_type VARCHAR(255),
// //         type_of_security_post VARCHAR(255),
// //         no_of_security_post VARCHAR(255),
// //         post_shareholding_percentage VARCHAR(255),
// //         allotment_acquisition_date_from VARCHAR(255),
// //         allotment_acquisition_date_to VARCHAR(255),
// //         initmation_to_company_date VARCHAR(255),
// //         mode_of_acquisition VARCHAR(255),
// //         exchange VARCHAR(255),
// //         broadcast_date_time VARCHAR(255),
// //         id SERIAL PRIMARY KEY,
// //     )`;
// //         // const result = JSON.parse(response);
// //         result.forEach(element => {
// //             console.log(element);
// //         });
// //     } catch (error) {
// //         console.error('Connection error:', error);
// //     } finally {
// //         await sql.end(); // Close the connection
// //     }

// // }

// // let result = [];
// // function InsertDataToArray(filepath: string) {
// //     try {

// //         fs.createReadStream(filepath)
// //             .pipe(csv())
// //             .on('data', async function (data) {
// //                 // Stop further processing after the first row
// //                 var values = Object.values(data);


// //                 const putValue = await sql`insert into Transactions values(${values[0]},
// //                     ${values[1]},
// //                     ${values[3]},
// //                     ${values[4]},
// //                     ${values[6]},
// //                     ${values[7]},
// //                     ${values[9]},
// //                     ${values[10]},
// //                     ${values[11]},
// //                     ${values[12]},
// //                     ${values[13]},
// //                     ${values[14]},
// //                     ${values[15]},
// //                     ${values[16]},
// //                     ${values[17]},
// //                     ${values[18]},
// //                     ${values[25]},
// //                     ${values[27]})`;

// //                 // console.log(putValue)


// //             })
// //             .on('end', async function () {
// //                 console.log('Finished reading the file.');

// //             });

// //         // console.log(result)
// //     } catch (error) {
// //         console.error('Connection error:', error);
// //     }
// // }
// // InsertColumn();
// // InsertDataToArray()



// async function checkTable() {
//     try {
//         const result = await sql`SELECT column_name, data_type, character_maximum_length, is_nullable
//         FROM information_schema.columns
//         WHERE table_name = 'transactions'`;
//         console.log(result)
//     } catch (error) {
//         console.error('Connection error:', error);
//     } finally {
//         // await sql.end(); // Close the connection
//     }
// }

// // function InsertData() {
// //     try {
// //         console.log("result", result)
// //     } catch (error) {
// //         console.error('Connection error:', error);
// //     } finally {
// //         // await sql.end(); // Close the connection
// //     }
// // }

// // InsertData()
// async function checkSchema() {
//     try {
//         const result = await sql`SELECT * FROM information_schema.tables WHERE table_schema = \'public\'`;
//         console.log(result)
//     } catch (error) {
//         console.error('Connection error:', error);
//     } finally {
//         await sql.end(); // Close the connection
//     }
// }

// type CsvRow = {
//     [key: string]: string;
// };



// export async function InsertMarketData(filepath : string, values : CsvRow , table : string) {
//     try {
       
//         console.log(values)
//         const putValue = await sql`insert into ${table} values(${values})`;
//         return putValue
//     } catch (error) {
//         console.error('Connection error:', error);
//     } 
// }


// // checkSchema();
// // InsertColumn();
// // InsertDataToArray();