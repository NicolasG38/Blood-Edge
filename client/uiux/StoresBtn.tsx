"use client";
import "./StoresBtn.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Store {
	id: number;
	title: string;
	text: string;
	text2: string;
	picture: string;
	picture2: string;
	link: string;
}

export default function StoresBtn() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [stores, setStores] = useState<Store[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		fetch(`${baseURL}/api/stores`)
			.then((response) => response.json())
			.then((data) => {
				interface Store {
					Stores_id: number;
					Stores_title: string;
					Stores_text: string;
					Stores_text_2: string;
					Stores_picture: string;
					Stores_picture_2: string;
					Store_link: string;
				}
				const mappedStores = (data as Store[]).map((store) => ({
					id: store.Stores_id,
					title: store.Stores_title,
					text: store.Stores_text,
					text2: store.Stores_text_2,
					picture: baseURL + store.Stores_picture,
					picture2: baseURL + store.Stores_picture_2,
					link: store.Store_link,
				}));

				setStores(mappedStores);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des magasins :", error);
			});
	}, [baseURL]);

	const getHoverColors = (id: number) => {
		if (id === 1)
			return { bg: "linear-gradient(90deg, #508FE6 0%, #2D5080 100%)" };
		if (id === 2)
			return { bg: "linear-gradient(90deg, #1387B8 0%, #111D2E 100%)" };
		return { bg: "linear-gradient(90deg, #f5f5f5 0%, #cccccc 100%)" };
	};

	return (
		<section id="containerStores">
			{stores.map((store: Store, idx: number) => (
				<Link
					href={`${store.link}`}
					key={store.id}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="StoresOuter">
						<div className="StoresText">
							<p className="StoresText_1">{store.text}</p>
							<p className="StoresText_2">{store.text2}</p>
						</div>
						<div
							className="StoresInner"
							style={{
								background:
									hoveredIndex === idx
										? getHoverColors(store.id).bg
										: "transparent",
								transition: "background 0.35s ease-in-out",
							}}
						>
							<div
								onMouseEnter={() => setHoveredIndex(idx)}
								onMouseLeave={() => setHoveredIndex(null)}
								className="StoresTitleAndIconContainer"
							>
								<p className="subSectionTitle">{store.title}</p>
								<Image
									className="StoresIcon"
									src={hoveredIndex === idx ? store.picture2 : store.picture}
									alt="Arsenal Icon"
									width={24}
									height={24}
								/>
							</div>
						</div>
					</div>
				</Link>
			))}
		</section>
	);
}
