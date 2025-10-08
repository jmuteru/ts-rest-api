import { logger } from "../../../lib/winston"
//modules
import config from "@/config"
//models
import User from "@/models/user"
import Token from "@/models/token"
//types
import { IUser } from "@/models/user"
//utils
import { genUsername } from "@/utils.ts"
import type { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt"


type UserData = Pick<IUser, 'email' | 'password' | 'role'>

const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body as UserData
    if (role==="admin" && !config.WHITELIST_ADMIN_EMAIL?.includes(email)){
        res.status(403).json({
            code:'AuthorizationError',
            message:'You cannot register as an admin.'

        })
        logger.warn(`User with email ${email} tried to register as an admin but is not whitelisted.`)
        return
    }
    try {
        const username = genUsername()
        const newUser = await User.create({
            username,
            email,
            password,
            role
        })

        //generate access token & refresh tokens for new user
        const accessToken = generateAccessToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)
        //store refresh token in db
        await Token.create({token:refreshToken, userId:newUser._id})
        console.log("refresh token", {
            userId:newUser._id,
            token:refreshToken
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: 'strict'

        })
        res.status(201).json({ //user created
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            accessToken
        })
        logger.info("User created successfully")
     
    }
    catch (err) {
        res.status(500).json({
            code: "ServerError",
            message: "Internal sever error.",
            error: err
        })
        logger.error("Error during registration", err)

    }
}

export default register