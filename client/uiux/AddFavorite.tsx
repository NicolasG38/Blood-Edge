import "./AddFavorite.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AddFavorite({ nanoSuitId }: { nanoSuitId: string }) {
	const [isLogged, setIsLogged] = useState(false);
	const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
	// 0: favorite, 1: heart_check, 2: favorite_fill, 3:heart_minus
	const [isFavorite, setIsFavorite] = useState(false);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const userId = localStorage.getItem("userId");

	const handleAddFavorite = () => {
		if (!isFavorite) {
			const storedUserId = localStorage.getItem("userId") || "";
			fetch(`${baseURL}/api/favorites`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: storedUserId,
					nanoSuitId,
				}),
			}).then(() => {
				setStep(1);
				setTimeout(() => setStep(2), 700);
				setIsFavorite(true);
			});
		} else {
			fetch(`${baseURL}/api/favorites`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					nanoSuitId,
				}),
			}).then(() => {
				setStep(3);
				setTimeout(() => {
					setStep(0);
					setIsFavorite(false);
				}, 700);
			});
		}
	};

	const getIcon = () => {
		if (step === 0) return "/assets/icons/favorite.svg";
		if (step === 1) return "/assets/icons/heart_check.svg";
		if (step === 2) return "/assets/icons/favorite_fill.svg";
		if (step === 3) return "/assets/icons/heart_minus.svg";
		return "/assets/icons/favorite.svg";
	};

	useEffect(() => {
		setIsLogged(!!localStorage.getItem("token"));
	}, []);

	return (
		<div className="add-favorite">
			{isLogged && (
				<button
					type="submit"
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
							transform:
								step === 1
									? "scale(1.3)"
									: step === 3
										? "scale(1.3)"
										: "scale(1)",
						}}
					/>
				</button>
			)}
		</div>
	);
}
