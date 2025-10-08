import dotenv from "dotenv"

dotenv.config()

const config ={
    PORT:process.env.PORT || 3000,
    NODE_ENV:process.env.NODE_ENV,
    WHITELIST_ORIGINS:['https://docs.ts-rest-api.jmuteru.com'],
    MONGO_URI:process.env.MONGO_URI,
    LOG_LEVEL:process.env.LOG_LEVEL || 'info',
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRY:process.env.REFRESH_TOKEN_EXPIRY,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    WHITELIST_ADMIN_EMAIL:process.env.WHITELIST_ADMIN_EMAIL
}

export default config