import express from "express"
import config from "./config"
import cors from "cors"
import { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import helmet from "helmet"

const app = express()

//cors options
const corsOptions:CorsOptions = {
    origin(origin, callback) {
        if (config.NODE_ENV === 'development'|| !origin || config.WHITELIST_ORIGINS.includes(origin)) {
            callback(null, true)

        }
        else{
            //reject origins not whitelisted
            callback(new Error(`CORS Error:${origin}is not allowed by CORS`),false)
        }
    },
}
//cors middleware
app.use(cors(corsOptions))

//JSON request body parsing

app.use(express.json())
//enable url-encoded requests
 app.use(express.urlencoded({extended:true})) 
 app.use(cookieParser())

 //response compression to reduce payload size & improve performance
 app.use(compression ({
    threshold:1024,//compress responses larger than 1kb
 }))

 //rate limiting middleware

 //use helmet to enhance security by setting various HTTP headers
 app.use(helmet())
app.get("/", (req, res) => {
    res.json({
        message: "This works"
    })
})

app.listen(config.PORT, () => {
    console.log(`server is running on port :${config.PORT}`)
})