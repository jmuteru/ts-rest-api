import dotenv from "dotenv"

dotenv.config()

const config ={
    PORT:process.env.PORT || 3000,
    NODE_ENV:process.env.NODE_ENV,
    WHITELIST_ORIGINS:['https://docs.ts-rest-api.jmuteru.com']
}

export default config