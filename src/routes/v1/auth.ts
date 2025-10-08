import { Router } from "express";
import{body} from "express-validator"

// controllers
import register from "@/controllers/v1/auth/register";
// middlewares

//models


const router = Router()

router.post("/register",body('email').trim().notEmpty().withMessage('Email is required'),register)

export default router