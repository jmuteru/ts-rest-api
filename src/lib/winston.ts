//winston for logging
import winston from "winston"

//module imports
import config from "../config"
import { format } from "path"


const {combine, timestamp,json, errors, align, printf,colorize}= winston.format
//define transports array to hold different logging transports
const transports:winston.transport[] =[

]

//if the server is not running in prod , add a console transport

if(config.NODE_ENV !=='production'){
    transports.push(
        new winston.transports.Console({
            format:combine(
            
                colorize({all:true}), //add colors to log levels
                timestamp({format:'YYYY-MM-DD hh:mm:ss A'}), //add timestamps to logs
                align(), //align log messages
                printf(({timeStamp , level , message , ...meta})=>{
                    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : ''

                    return `${timeStamp} [${level.toUpperCase()}] : ${message}`
                })
            )
        }
        )
    )

}