import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 min
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: "TOO_MANY_ATTEMPTS" },
});
