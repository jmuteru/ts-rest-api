import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // instead of "limit"
    standardHeaders: true,
    legacyHeaders: true,
    message: {
        error: "You have sent too many requests. Please try again later."
    }
});

export default limiter;
