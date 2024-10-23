import router from "./search";
import sql from "../database/config"
const StockRouter = router;
StockRouter.get('/stockdetail', async (req , res) => {
    try{
        console.log("code executed");
        const result = await sql`SELECT table_name FROM information_schema.tables`;
        
        res.json({
            response : result
        });

    }catch(err){
        res.json({
            error : err,
            message : err.message
        })
    }
}
)
export default StockRouter;