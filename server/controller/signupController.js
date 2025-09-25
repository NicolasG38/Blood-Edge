import { signupAndAuth } from "../action/signupActions.js";
import { z } from "zod";

export const validateSignup = (req, res, next) => {
	const schema = z
		.object({
			email: z
				.string()
				.trim()
				.toLowerCase()
				.email({ message: "Format d'email invalide" }),
			email_confirm: z
				.string()
				.trim()
				.toLowerCase()
				.email({ message: "Format d'email invalide" }),
			pseudo: z
				.string()
				.trim()
				.min(3)
				.max(20)
				.regex(/^[A-Za-z0-9_\-]+$/),
			password: z.string().min(8).max(128),
			is_accept_cgu: z
				.boolean()
				.refine((v) => v === true, { message: "CGU requises" }),
			type_account: z.coerce.number().default(1),
		})
		.refine((d) => d.email === d.email_confirm, {
			message: "Emails différents",
			path: ["email_confirm"],
		});

	const parse = schema.safeParse(req.body);
	if (!parse.success) {
		return res
			.status(400)
			.json({ error: "VALIDATION_ERROR", details: parse.error.format() });
	}
	req.body = parse.data;
	next();
};

export async function signup(req, res) {
	try {
		const { pseudo, email, password } = req.body || {};
		const result = await signupAndAuth({ pseudo, email, password });

		if (!result.ok) {
			console.warn("[SIGNUP] signupAndAuth failed:", result);
			const conflictMsgs = {
				PSEUDO_TAKEN: "Pseudo déjà utilisé",
				EMAIL_TAKEN: "Email déjà utilisé",
				PSEUDO_OR_EMAIL_TAKEN: "Pseudo ou email déjà utilisé",
				UNIQUE_VIOLATION: "Valeur déjà utilisée",
			};
			if (
				[
					"PSEUDO_TAKEN",
					"EMAIL_TAKEN",
					"PSEUDO_OR_EMAIL_TAKEN",
					"UNIQUE_VIOLATION",
				].includes(result.code)
			) {
				return res.status(409).json({
					error: "CONFLICT",
					code: result.code,
					message: conflictMsgs[result.code] || "Conflit",
				});
			}
			if (result.code === "CONFIG_ERROR") {
				return res.status(500).json({ error: "CONFIG_ERROR" });
			}
			return res.status(400).json({ error: "Requête invalide" });
		}

		res.cookie("token", result.token, {
			httpOnly: true,
			sameSite: "lax",
			maxAge: 3600000,
		});

		res.cookie("pseudo", user.Users_pseudo, {
			httpOnly: false,
			sameSite: "lax",
			secure: false,
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		});

		res.cookie("userId", result.user.Users_id, {
			httpOnly: false,
			sameSite: "lax",
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		});

		return res.json({
			user: result.user,
			token: result.token,
			message: "Compte créé et connecté",
		});
	} catch (e) {
		console.error("[SIGNUP] unexpected error:", e);
		return res.status(500).json({ error: "SERVER_ERROR" });
	}
}
