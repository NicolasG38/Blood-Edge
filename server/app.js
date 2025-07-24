import express from "express";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
	console.log("Server running at PORT: ", PORT);
});

export default app;
