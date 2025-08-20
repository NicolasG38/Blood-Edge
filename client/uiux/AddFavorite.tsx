import "./AddFavorite.css";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";

type AddFavoriteProps = {
	exo?: string | undefined | null;
	equip?: string | undefined | null;
	ns?: string | undefined | null;
};

export default function AddFavorite({ exo, equip, ns }: AddFavoriteProps) {
	const [isLogged, setIsLogged] = useState(false);
	const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const buildPayload = useCallback(() => {
		const payload: {
			userId: string | null;
			exo?: string;
			equip?: string;
			ns?: string;
		} = { userId };
		if (exo) payload.exo = exo;
		if (equip) payload.equip = equip;
		if (ns) payload.ns = ns;
		return payload;
	}, [userId, exo, equip, ns]);

	useEffect(() => {
		setUserId(localStorage.getItem("userId"));
		setIsLogged(!!localStorage.getItem("token"));
	}, []);

	const handleAddFavorite = () => {
		if (!userId) return;
		const payload = buildPayload();
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
		<div className="add-favorite">
			{isLogged && (
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
			)}
		</div>
	);
}
