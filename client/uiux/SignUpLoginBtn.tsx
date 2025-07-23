"use client";
import "./SignUpLoginBtn.css";
import Image from "next/image";
import { useState } from "react";

export default function SignUpLoginBtn() {
	const [hovered, setHovered] = useState(false);

	return (
		<section id="containerSignUplogin">
			<div id="signuplogin">
				<div id="btnSignup">
					<p>S'inscrire</p>
				</div>
				<div
					id="btnLogin"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<p>Se connecter</p>
					<Image
						id="loginIcon"
						src={
							hovered
								? "/assets/icons/contacts_product_blue.svg"
								: "/assets/icons/contacts_product.svg"
						}
						alt="Login Icon"
						width={24}
						height={24}
					/>
				</div>
			</div>
		</section>
	);
}
