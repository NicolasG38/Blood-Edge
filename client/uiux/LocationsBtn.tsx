import "./LocationsBtn.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Location {
	id: number;
	name: string;
	country: string;
	color: string;
	iconBlack: string;
	iconWhite: string;
}

const LocationsBtn = () => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [locations, setLocations] = useState<Location[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	useEffect(() => {
		fetch(`${baseURL}/api/locations`)
			.then((response) => response.json())
			.then((data) => {
				interface ApiLocation {
					Locations_id: number;
					Locations_name_fr: string;
					Locations_name_en: string;
					Locations_country: string;
					Locations_color: string;
					Locations_icon_black: string;
					Locations_icon_white: string;
				}
				const mapped = (data as ApiLocation[]).map((location) => ({
					id: location.Locations_id,
					name: location.Locations_name_fr,
					country: location.Locations_country,
					color: location.Locations_color,
					iconBlack: baseURL + location.Locations_icon_black,
					iconWhite: baseURL + location.Locations_icon_white,
				}));
				setLocations(mapped);
			})
			.catch((error) => {
				console.error("Error fetching locations:", error);
			});
	}, [baseURL]);

	return (
		<div id="locations-btn-container">
			{locations.map((location, idx: number) => {
				const isHover = hoveredIndex === idx;
				return (
					<button
						key={location.id}
						type="button"
						className="locations-btn"
						onMouseEnter={() => setHoveredIndex(idx)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<div className="country">{location.country}</div>
						<div
							className="locationIcon"
							style={{
								background: isHover ? `var(${location.color})` : "transparent",
							}}
						>
							<div
								className="location"
								style={{ color: isHover ? "white" : "black" }}
							>
								{location.name}
							</div>
							<Image
								src={isHover ? location.iconWhite : location.iconBlack}
								alt="Location"
								className="location-icon"
								width={18}
								height={18}
							/>
						</div>
					</button>
				);
			})}
		</div>
	);
};

export default LocationsBtn;
