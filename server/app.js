import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use("/icons", express.static("public/icons"));

app.use(router);
app.listen(PORT, () => {
	console.log("Server running at PORT: ", PORT);
});

export default app;
