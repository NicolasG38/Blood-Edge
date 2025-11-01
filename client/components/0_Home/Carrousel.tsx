"use client";
import "./Carrousel.css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

function Box({ src, title }: { src: string; title: string }) {
	return (
		<motion.div
			key={title}
			className="item"
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<Image
				style={{ width: "100%", height: "100%" }}
				src={`/assets/images/${src}.jpg`}
				alt={title}
				width={3840} // ← adapte selon la taille réelle de ton image
				height={2160} // ← adapte selon la taille réelle de ton image
			/>
		</motion.div>
	);
}

export default function Carrousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [countdown, setCountdown] = useState(5);

	const items = [
		{ src: "carrousel_01", title: "carrousel_01" },
		{ src: "carrousel_02", title: "carrousel_02" },
		{ src: "carrousel_03", title: "carrousel_03" },
		{ src: "carrousel_04", title: "carrousel_04" },
		{ src: "carrousel_05", title: "carrousel_05" },
		{ src: "carrousel_06", title: "carrousel_06" },
		{ src: "carrousel_07", title: "carrousel_07" },
		{ src: "carrousel_08", title: "carrousel_08" },
		{ src: "carrousel_09", title: "carrousel_09" },
		{ src: "carrousel_10", title: "carrousel_10" },
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					// Move to next item with infinite loop
					setCurrentIndex((current) => (current + 1) % items.length);
					return 5; // Reset countdown
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	console.log("Carrousel rendu !");

	return (
		<div className="container">
			<div className="ticker-container">
				<AnimatePresence mode="wait">
					<Box
						key={currentIndex}
						src={items[currentIndex].src}
						title={items[currentIndex].title}
					/>
				</AnimatePresence>
			</div>
		</div>
	);
}
