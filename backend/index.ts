import express, { Request, Response } from "express";
import dotenv from "dotenv";

import cors from "cors";
import bodyParser from "body-parser";
import router from "./router";
// configures dotenv to work in your application
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router)



app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});