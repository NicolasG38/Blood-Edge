import "./SearchBar.css";
import Image from "next/image";

export default function SearchBar() {
	return (
		<div id="search-bar-main">
			<input type="text" placeholder="Looking for something..." />
			<button id="search-button" type="submit">
				Search
				<Image
					src="/assets/icons/travel_explore.svg"
					alt="Search"
					width={36}
					height={36}
				/>
			</button>
		</div>
	);
}
