import { z } from "zod";

const signUpSchema = z.object({
	email: z.string().trim().toLowerCase().email("Email invalide"),
	pseudo: z
		.string()
		.trim()
		.min(3, "Pseudo trop court")
		.max(20, "Pseudo trop long")
		.regex(/^[A-Za-z0-9_\-]+$/, "Caractères autorisés: lettres, chiffres, _ -"),
	password: z
		.string()
		.min(8, "Minimum 8 caractères")
		.max(128)
		.regex(/[a-z]/, "1 minuscule requise")
		.regex(/[A-Z]/, "1 majuscule requise")
		.regex(/[0-9]/, "1 chiffre requis")
		.regex(/[^A-Za-z0-9]/, "1 caractère spécial requis"),
	is_accept_cgu: z.literal(true, {
		errorMap: () => ({ message: "Vous devez accepter les CGU" }),
	}),
	type_account: z
		.number()
		.int()
		.refine((v) => [1, 2].includes(v), "type_account invalide"),
});

function validateSignup(req, res, next) {
	const parsed = signUpSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({
			error: "VALIDATION_ERROR",
			details: parsed.error.format(),
		});
	}
	req.body = parsed.data;
	next();
}

export { signUpSchema, validateSignup };
