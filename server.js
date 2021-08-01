const express = require("./config/express.js");
const mongoose = require("./config/mongoose.js");
const db = mongoose();
const app = express();
app.listen(3000, () => {
	console.log("Server listenning on port 3000!");
});
