import express from "express";




const router = express.Router();



router.get("/auth", (req, res) => {
    const {email , password } =  req.query;

    if(email === 'admin' && password === 'admin'){
        res.json({
        message: "Login Successful",
        authenticated : true
    })
    }else {
        res.json({
            message: "Login failed",
            authenticated : false
        })
    }
})

export default router;