import { timeStamp } from "console";
import { Router } from "express";
import authRoutes from "./auth"
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

        router.use("/auth", authRoutes)

        export default router