import express from "express"
import cors from "cors"
import { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import helmet from "helmet"
//module imports
import config from "./config"
import limiter from "./lib/rateLimiter"
import { connectToDB, disconnectFromDB } from "./lib/mongoose"
//router
import v1Routes from "./routes/v1"
const app = express()

//cors options
const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (config.NODE_ENV === 'development' || !origin || config.WHITELIST_ORIGINS.includes(origin)) {
            callback(null, true)

        }
        else {
            //reject origins not whitelisted
            callback(new Error(`CORS Error:${origin}is not allowed by CORS`), false)
        }
    },
}
//cors middleware
app.use(cors(corsOptions))

//JSON request body parsing

app.use(express.json())
//enable url-encoded requests
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//response compression to reduce payload size & improve performance
app.use(compression({
    threshold: 1024,//compress responses larger than 1kb
}))



//use helmet to enhance security by setting various HTTP headers
app.use(helmet())

//rate limiter middleware


app.use(limiter)

const startServer = async () => {
    try {
        await connectToDB()

        app.use('/api/v1', v1Routes) //define API route
        app.listen(config.PORT, () => {
            console.log(`server is running on port :${config.PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        if (config.NODE_ENV === "production") {
            process.exit(1);
        }
    }
};


/**
 graceful shutdown:
 -handle server shutdown gracefully by disconnecting from the db.
 - disconnects from db before shutting down the server
 - logs success msg if disconnection is successful or logs error when not
 - exits with status code '0' indicating a successful shutdown
 * */

const handleShutDown = async () => {
    try {
                await disconnectFromDB()

        console.log("Server has been SHUTDOWN");
        process.exit(0)


    }
    catch (err) {
        console.log("Error:Unable to shutdown server.", err)

    }
}

startServer();

/**
 * Listen for termination signals ('SIGTERM' &'SIGINT')
 * **/ 
process.on("SIGTERM", handleShutDown)
process.on("SIGINT", handleShutDown)

