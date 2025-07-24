import app from "./app.js";

const port = process.env.APP_PORT;

app.listen(port, () => {
	console.info(`Server is listening on port ${port}`);
});
