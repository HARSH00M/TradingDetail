import express, { Request, Response } from "express";
import dotenv from "dotenv";
import SearchRouter from "./src/routes/search";
import { router } from "./src/routes/tables";
import AuthRouter from "./src/routes/auth";
import InsiderRouter from "./src/routes/insider";
import cors from "cors";
import bodyParser from "body-parser";
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

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.use("/tables", router);
app.use(AuthRouter);
app.use(SearchRouter)
app.use('/insider', InsiderRouter)

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});