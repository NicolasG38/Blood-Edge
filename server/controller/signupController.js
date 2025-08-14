import { z } from "zod";
import { signupAndAuth } from "../action/signupActions.js";

const signUpSchema = z
	.object({
		email: z.string().trim().toLowerCase().email("Email invalide"),
		email_confirm: z.string().trim().toLowerCase().email("Email invalide"),
		pseudo: z
			.string()
			.trim()
			.min(3, "Pseudo trop court")
			.max(20, "Pseudo trop long")
			.regex(
				/^[A-Za-z0-9_\-]+$/,
				"Caractères autorisés: lettres, chiffres, _ -",
			),
		password: z
			.string()
			.min(8, "Minimum 8 caractères")
			.max(128)
			.regex(/[a-z]/, "1 minuscule requise")
			.regex(/[A-Z]/, "1 majuscule requise")
			.regex(/[0-9]/, "1 chiffre requis")
			.regex(/[^A-Za-z0-9]/, "1 caractère spécial requis"),
		is_accept_cgu: z.preprocess(
			(v) => {
				// Normaliser toutes les formes valides vers true
				if (v === true || v === "on" || v === "true" || v === 1 || v === "1")
					return true;
				// Toute autre valeur => false (échec ensuite)
				return false;
			},
			z.boolean().refine((val) => val === true, {
				message: "Vous devez accepter les CGU",
			}),
		),
		type_account: z
			.number()
			.int()
			.refine((v) => [1, 2].includes(v), "type_account invalide"),
	})
	.refine((data) => data.email === data.email_confirm, {
		path: ["email_confirm"],
		message: "Les emails ne correspondent pas",
	});
function validateSignup(req, res, next) {
	if (req.body?.type_account && typeof req.body.type_account === "string") {
		req.body.type_account = Number(req.body.type_account);
	}

	const parsed = signUpSchema.safeParse(req.body);

	if (!parsed.success) {
		const details = parsed.error.format();
		let firstMsg;
		for (const k of Object.keys(details)) {
			if (k === "_errors") continue;
			const entry = details[k];
			if (entry?._errors?.length) {
				firstMsg = entry._errors[0];
				break;
			}
		}
		return res.status(400).json({
			error: "VALIDATION_ERROR",
			message: firstMsg || "Erreur de validation",
			details,
		});
	}

	const { email_confirm, ...clean } = parsed.data;
	req.body = clean;
	return next();
}

export { signUpSchema, validateSignup };

export async function signup(req, res) {
	try {
		const { pseudo, email, password } = req.body || {};
		const result = await signupAndAuth({ pseudo, email, password });

		if (!result.ok) {
			if (result.code === "PSEUDO_TAKEN")
				return res.status(409).json({ error: "Pseudo déjà utilisé" });
			if (result.code === "CONFIG_ERROR")
				return res.status(500).json({ error: "CONFIG_ERROR" });
			return res.status(400).json({ error: "Requête invalide" });
		}

		res.cookie("auth", result.token, {
			httpOnly: true,
			sameSite: "lax",
			maxAge: 3600000,
		});

		return res.json({
			user: result.user,
			token: result.token,
			message: "Compte créé et connecté",
		});
	} catch (e) {
		console.error("SIGNUP ERROR:", e);
		return res.status(500).json({ error: "INTERNAL_ERROR" });
	}
}
