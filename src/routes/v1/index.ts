import { timeStamp } from "console";
import { Router } from "express";

const router  = Router()

//root route

   router.get("/", (req, res) => {
            res.status(200).json({
                message: "API works",
                status:'ok',
                version:'1.0.0',
                docs:'https://docs.ts-rest-api.jmuteru.com',
                timeStamp:new Date().toISOString()

            })
        })


        export default router