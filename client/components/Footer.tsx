import Image from "next/image";

import "./Footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<section id="ContainerLinks">
				<section id="containerOne">
					<article id="Shiftup">
						<h1 id="ShiftupTitle">SHIFT UP</h1>
						<section id="ShiftupLinks">
							<p>
								<a
									href="https://www.shiftup.co.kr/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Official Website
								</a>
							</p>
							<p>
								<a
									href="https://www.stellar-blade.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Stellar-blade.com
								</a>
							</p>
							<p>
								<a
									href="https://nikke-en.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Goddess of Victory: NIKKE
								</a>
							</p>
						</section>
					</article>
					<article id="SIE">
						<h1 id="SIETitle">SONY INTERACTIVE ENTERTAINMENT</h1>
						<section id="SIELinks">
							<p>
								<a
									href="https://sonyinteractive.com/en/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Official Website
								</a>
							</p>
						</section>
					</article>
				</section>
				<section id="containerTwo">
					<article id="Steam">
						<h1 id="SteamTitle">STEAM</h1>
						<section id="SteamLinks">
							<p>
								<a
									href="https://www.shiftup.co.kr/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Official Website
								</a>
							</p>
						</section>
					</article>
					<article id="PSStore">
						<h1 id="PSStoreTitle">PS STORE</h1>
						<section id="PSStoreLinks">
							<p>
								<a
									href="https://www.shiftup.co.kr/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Official Website
								</a>
							</p>
						</section>
					</article>
				</section>
			</section>
			<span id="Footer">
				<p id="copyrightFooter">
					STELLAR BLADE© 2024 SHIFT UP Corporation. All rights reserved.
					Published by Sony Interactive Entertainment
				</p>
				<p id="shiftupCopyrightFooter">
					SHIFTUP :: All rights reserved, Shiftup Corp.
				</p>
			</span>
		</footer>
	);
}
