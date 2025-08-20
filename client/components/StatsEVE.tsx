"use client";
import "./StatsEVE.css";
import { useState, useEffect } from "react";
import Image from "next/image";

type StatsEVEMap = {
	Stats_id: number;
	Stats_title_fr: string;
	Stats_title_en: string;
	Stats_bar: boolean | 0 | 1; // ← supporte 0/1
	Stats_value: number | string | null; // ← peut être string/null
	Stats_value_max: number | string | null;
	Stats_decimal: number | string | null;
	Stats_icon: string;
};

const toNum = (v: unknown) => {
	if (typeof v === "number") return v;
	if (typeof v === "string" && v.trim() !== "") return Number(v);
	return Number.NaN;
};

const clampPct = (n: number) => Math.max(0, Math.min(100, n));

const getPct = (s: StatsEVEMap) => {
	const dec = toNum(s.Stats_decimal);
	if (Number.isFinite(dec)) return clampPct(Math.abs(dec)); // -38 -> 38
	const val = toNum(s.Stats_value);
	const max = toNum(s.Stats_value_max);
	if (Number.isFinite(val) && Number.isFinite(max) && max > 0) {
		return clampPct((val / max) * 100);
	}
	return 0;
};

const isNegative = (s: StatsEVEMap) => {
	const dec = toNum(s.Stats_decimal);
	const val = toNum(s.Stats_value);
	const ref = Number.isFinite(dec) ? dec : val;
	return Number.isFinite(ref) && ref < 0;
};

const isDisplayBar = (s: StatsEVEMap) => Boolean(Number(s.Stats_bar));

export default function StatsEVE() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const [statsEVE, setStatsEVE] = useState<StatsEVEMap[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/stats-eve`)
			.then((response) => response.json())
			.then((data) => {
				setStatsEVE(data);
			})
			.catch((error) => console.error("Error fetching stats:", error));
	}, [baseURL]);

	console.log("Stats EVE:", statsEVE);
	return (
		<div className="statsEVEContainer">
			<div id="statsEVEHeader">
				<p>Stats EVE</p>
			</div>
			<div className="statsEVEContent">
				{statsEVE.length === 0 ? (
					<p>Aucune donnée.</p>
				) : (
					<ul>
						{statsEVE.map((s) => {
							return (
								<li key={s.Stats_id}>
									<div className="statsEVEIconContainer">
										<Image
											src={`${baseURL}${s.Stats_icon}`}
											alt=""
											width={32}
											height={32}
											className="statsEVEIcon"
										/>
										<p className="statsEVEIconTitle">{s.Stats_title_fr}</p>
									</div>
									<p
										className="statsEVEValue"
										style={{
											color: isNegative(s) ? "var(--redNegative)" : "inherit",
										}}
									>
										{Number.isFinite(toNum(s.Stats_decimal))
											? `${toNum(s.Stats_decimal)}%`
											: Number.isFinite(toNum(s.Stats_value))
												? toNum(s.Stats_value)
												: "-"}
									</p>
									<div className="statsEVEBar">
										<div
											className="statsEVEBarStatsGray"
											style={{ display: isDisplayBar(s) ? "block" : "none" }}
										/>
										<div
											className="statsEVEBarStatsOrange"
											style={{
												width: `${getPct(s)}%`,
												display: isDisplayBar(s) ? "block" : "none",
											}}
										/>
									</div>
								</li>
							);
						})}
						<div id="statsEVEImageContainer">
							<div id="statsEVEImageOverlay" />
							<Image
								src="/assets/background/background_exospine.webp"
								alt="Stats EVE"
								width={500}
								height={300}
								id="statsEVEImage"
							/>
						</div>
					</ul>
				)}
			</div>
		</div>
	);
}
