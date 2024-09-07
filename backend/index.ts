import express, { Request, Response } from "express";
import dotenv from "dotenv";
import SearchRouter from "./src/routes/search";
import { router } from "./src/routes/tables";
import AuthRouter from "./src/routes/auth";
import csv from "csv-parser";
import cors from "cors";
import sql from "./src/config/dbConnection";
// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.use("/tables", router);
app.get('/inserttotable', (req, res) => {
  async function InsertColumn() {
    // values[0],
    // values[1],
    // values[3],
    // values[4],
    // values[5],
    // values[6],
    // values[12],
    // values[13],
    // values[14])
    try {
        // await sql`drop table Transactions`;
        const result = await sql`create table Transactions(
        symbol VARCHAR(255) ,
        company VARCHAR(255) ,
        acquirer_disposer_name VARCHAR(255),
        category_of_person VARCHAR(255),
        no_of_security_prior VARCHAR(255),
        shareholding_prior_percentage VARCHAR(255),
        no_of_securities_acquired_disposed VARCHAR(255),
        value_of_security_acquired_disposed VARCHAR(255),
        transaction_type VARCHAR(255),
        type_of_security_post VARCHAR(255),
        no_of_security_post VARCHAR(255),
        post_shareholding_percentage VARCHAR(255),
        allotment_acquisition_date_from VARCHAR(255),
        allotment_acquisition_date_to VARCHAR(255),
        initmation_to_company_date VARCHAR(255),
        mode_of_acquisition VARCHAR(255),
        exchange VARCHAR(255),
        broadcast_date_time VARCHAR(255),
        id SERIAL PRIMARY KEY,
    )`;
        // const result = JSON.parse(response);
        result.forEach(element => {
            console.log(element);
        });
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await sql.end(); // Close the connection
    }

}
InsertColumn();
  res.send('Done')
})

app.get('/insertdataintotable', (req, res) => {
  function InsertDataToArray() {
    try {
        
        fs.createReadStream('./src/files/data.csv')
            .pipe(csv())
            .on('data', async function (data) {
                // Stop further processing after the first row
                var values : any = Object.values(data);
                
                
                const putValue = await sql`insert into Transactions values(${values[0]},
                    ${values[1]},
                    ${values[3]},
                    ${values[4]},
                    ${values[6]},
                    ${values[7]},
                    ${values[9]},
                    ${values[10]},
                    ${values[11]},
                    ${values[12]},
                    ${values[13]},
                    ${values[14]},
                    ${values[15]},
                    ${values[16]},
                    ${values[17]},
                    ${values[18]},
                    ${values[25]},
                    ${values[27]})`;

            // console.log(putValue)
                    
                
            })
            .on('end', async function () {
                console.log('Finished reading the file.');
                
            });

            InsertDataToArray()

            res.send('Done')
        // console.log(result)
    } catch (error) {
        console.error('Connection error:', error);
    } 
}
})
app.use(AuthRouter);
app.use(SearchRouter)

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});