import mongoose from "mongoose"
import type { ConnectOptions } from "mongoose"
import config from "../config"


const clientOptions :ConnectOptions ={
    dbName:'ts-rest-api',
    appName:"TS-API-CLUSTER",
    serverApi:{
        version:'1',
        strict:true,
        deprecationErrors:true
    }
}


/**
- establish connection to mongodb via mongoose
-use MONGO_URI as the connection string
-clientOptions contains extra configs for mongoose
- errors are properly handled

**/
export const connectToDB = async ()=>{
        if (!config.MONGO_URI){
            throw new Error("MongoDB URI is not defined.Check your config.")

        }

        try{
            await mongoose.connect(config.MONGO_URI, clientOptions)  
            console.log("Connection to DB is successful", {
                uri:config.MONGO_URI,
                options:clientOptions
            })
        }

        catch(err){
                    if(err instanceof Error){
                        console.log("Error connecting to DB",err)
                    }
        }
}


/** 
 Disconnecting from the DB
 * disconnect from db (asynchronously)
 * logs a success message if disconnection is successful
 * throws an error if not successful
 * **/

 export const disconnectFromDB = async ()=>{
    try{
        await mongoose.disconnect()
        console.log("Disconnected from DB successfully.",{
            uri:config.MONGO_URI,
            options:clientOptions
        })
    }

    catch(err){
        if(err instanceof Error)
            throw new Error(err.message)
    }
    console.log('Error disconnecting from DB.');
    
 }

