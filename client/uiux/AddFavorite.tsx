import "./AddFavorite.css";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useCallback, useState, useEffect } from "react";

type AddFavoriteProps = {
	exo?: string | undefined | null;
	equip?: string | undefined | null;
	ns?: string | undefined | null;
};

export default function AddFavorite({ exo, equip, ns }: AddFavoriteProps) {
	const { isLogged, userId } = useAuth();
	const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
	// 0: favorite, 1: heart_check, 2: favorite_fill, 3:heart_minus
	const [isFavorite, setIsFavorite] = useState(false);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	// Exemple d'utilisation dans AddFavorite :

	const buildPayload = useCallback(() => {
		if (!userId) return null; // Ajout d'une vérification
		const payload: {
			userId: string;
			exo?: string;
			equip?: string;
			ns?: string;
		} = { userId };
		if (exo) payload.exo = exo;
		if (equip) payload.equip = equip;
		if (ns) payload.ns = ns;
		return payload;
	}, [userId, exo, equip, ns]);

	const handleAddFavorite = () => {
		const payload = buildPayload();
		if (!payload) return; // Empêche l'utilisation d'un userId null
		const keys = ["exo", "equip", "ns"].filter(
			(k) => (payload as Record<string, unknown>)[k],
		);
		if (keys.length !== 1) return; // refuse si aucune ou plusieurs cibles
		if (!isFavorite) {
			fetch(`${baseURL}/api/favorites`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}).then(() => {
				setStep(1);
				setTimeout(() => setStep(2), 700);
				setIsFavorite(true);
			});
		} else {
			fetch(`${baseURL}/api/favorites`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}).then(() => {
				setStep(3);
				setTimeout(() => {
					setStep(0);
					setIsFavorite(false);
				}, 700);
			});
		}
	};

	useEffect(() => {
		if (!userId) return;
		const payload = buildPayload();
		fetch(`${baseURL}/api/favorites/status`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		})
			.then((res) => res.json())
			.then((data) => {
				setIsFavorite(data.isFavorite);
				setStep(data.isFavorite ? 2 : 0);
			});
	}, [userId, buildPayload, baseURL]);

	const getIcon = () => {
		if (step === 0) return "/assets/icons/favorite.svg";
		if (step === 1) return "/assets/icons/heart_check.svg";
		if (step === 2) return "/assets/icons/favorite_fill.svg";
		if (step === 3) return "/assets/icons/heart_minus.svg";
		return "/assets/icons/favorite.svg";
	};
	return (
		isLogged && (
			<div className="add-favorite">
				<button
					type="button"
					id="add-favorite-button"
					onClick={handleAddFavorite}
				>
					<Image
						src={getIcon()}
						alt="Add to Favorites"
						width={16}
						height={16}
						style={{
							transition:
								"opacity 0.35s ease-in-out, transform 0.35s ease-in-out",
							transform: step === 1 || step === 3 ? "scale(1.3)" : "scale(1)",
						}}
					/>
				</button>
			</div>
		)
	);
}
