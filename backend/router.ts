import {Router} from 'express'

import StockRouter from "./src/routes/stockdetail";
import SearchRouter from "./src/routes/search";
import table_router  from "./src/routes/tables";
import AuthRouter from "./src/routes/auth";
import InsiderRouter from "./src/routes/insider";

const router = Router();



router.get("/", (request, response) => { 
    response.status(200).send("Hello World");
  }); 

router.use(StockRouter)
router.use("/tables", table_router);
router.use(AuthRouter);
router.use(SearchRouter)
router.use('/insider', InsiderRouter)


export default router;