import { useEffect, useRef } from "react";

export default function StellarBladeTimeline() {
	const timelineRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Charge le script uniquement côté client
		if (typeof window !== "undefined") {
			if (!document.getElementById("twitter-wjs")) {
				const script = document.createElement("script");
				script.id = "twitter-wjs";
				script.src = "https://platform.twitter.com/widgets.js";
				script.async = true;
				document.body.appendChild(script);
				script.onload = () => {
					// @ts-ignore
					window.twttr?.widgets?.load(timelineRef.current);
				};
			} else {
				// @ts-ignore
				window.twttr?.widgets?.load(timelineRef.current);
			}
		}
	}, []);

	return (
		<div ref={timelineRef}>
			<a
				className="twitter-timeline"
				href="https://twitter.com/XDevelopers?ref_src=twsrc%5Etfw"
				data-width="600"
				data-height="680"
			>
				Tweets by XDevelopers
			</a>
		</div>
	);
}
