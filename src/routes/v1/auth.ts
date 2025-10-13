import { Router } from "express";
import { body } from "express-validator"

// controllers
import register from "@/controllers/v1/auth/register";
// middlewares
import validationError from "@/middleware/validationError";
//models
import User from "@/models/user";

const router = Router()

router.post(
    "/register",
    //email validation
    body('email').trim()
        .notEmpty()
        .withMessage('Email is required')
        .isLength({max:50})
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async(val)=>{
            const userExists= await User.exists({email:val})
            if (userExists){
                throw new Error('User email or password is invalid')

            }
        }),
        //password validation
    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:8})
    .withMessage('Password must be at least 8 characters long'),
    body('role')
    .optional()
    .isString()
    .withMessage('role must be a string')
    .isIn(['admin','user'])
    .withMessage('Role must either be admin or user')
  
    
    ,validationError
    , register
)

export default router