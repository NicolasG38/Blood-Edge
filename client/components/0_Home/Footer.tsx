import StoresBtn from "../../uiux/StoresBtn";

import "./Footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<section id="ContainerLinks">
				<section id="containerOne">
					<article id="Shiftup">
						<h1 id="ShiftupTitle">SHIFT UP</h1>
						<section id="ShiftupLinks">
							<a
								href="https://www.shiftup.co.kr/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Official Website
							</a>
							<a
								href="https://www.stellar-blade.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Stellar-blade.com
							</a>
							<a
								href="https://nikke-en.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Goddess of Victory: NIKKE
							</a>
						</section>
					</article>
					<article id="SIE">
						<h1 id="SIETitle">SONY INTERACTIVE ENTERTAINMENT</h1>
						<section id="SIELinks">
							<a
								href="https://sonyinteractive.com/en/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Official Website
							</a>
						</section>
					</article>
				</section>
				<section id="containerTwo">
					<section id="legal">
						<article id="terms">
							<h1 id="LegalTitle">LÉGAL</h1>
							<section id="legalLinks">
								<a
									href="https://www.google.fr"
									target="_blank"
									rel="noopener noreferrer"
								>
									Mentions Légales
								</a>
								<a
									href="https://www.google.fr"
									target="_blank"
									rel="noopener noreferrer"
								>
									Politique de cookies
								</a>
								<a
									href="https://www.google.fr"
									target="_blank"
									rel="noopener noreferrer"
								>
									CGU
								</a>
							</section>
						</article>
					</section>
				</section>
				<section id="containerThree">
					<section id="Support">
						<article id="contact">
							<h1 id="ContactTitle">SUPPORT</h1>
							<section id="ContactLinks">
								<a
									href="https://www.google.fr"
									target="_blank"
									rel="noopener noreferrer"
								>
									Contact
								</a>
							</section>
						</article>
					</section>
				</section>
			</section>

			<StoresBtn />
			<span id="footerLegalMentions">
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
