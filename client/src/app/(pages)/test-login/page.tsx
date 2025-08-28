"use client";
import Login from "../../../../components/0.1_Auth/Login";

export default function TestLoginPage() {
	return (
		<div
			style={{
				display: "flex",
				margin: "auto",
			}}
		>
			<Login
				onSwitch={() => {}}
				onSuccess={() => {
					console.log("SUCCESS CALLBACK");
				}}
			/>
		</div>
	);
}
