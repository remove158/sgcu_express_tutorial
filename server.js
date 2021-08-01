// server.js

import express from "./config/express.js";
import mongoose from "./config/mongoose.js";
// เรียกใช้ db ก่อนเพื่อต่อ mongoose  ( ป้องกัน express ต่อไม่ติด)
const db = mongoose(); // return mongoose.connect(config.mongoUri)
const app = express();
app.listen(3000, () => {
	console.log("Server listenning on port 3000!");
});
