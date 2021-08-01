import express from "./config/express.js";
import mongoose from "./config/mongoose.js";
const db = mongoose();
const app = express();
app.listen(3000, () => {
	console.log("Server listenning on port 3000!");
});
