## What is Mongoose

-   ODM (Object-Document Mapper)
    -   แปลง Javascript Object เป็น MongoDB Document
-   สามารถใช้ Scema ใการออกแบบ Model
-   ทำ Data Validation ตรวจสอบข้อมูล

## การติดตั้ง Mongoose

`npm i mongoose`

## การเชื่อมต่อ MongoDB

MongoDB Connection URI
`mongodb://username:password@hostnamem:port/database`
`mongodb://localhost:27017/my-project`

Connect To DB

```javascript
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/my-project";
const db = moongse.connect(uri);
```

## สร้าง Config สำหรับ mongo แต่ละ enviroment

```javascript
// developmeent.js
const devConfig = {
	mongoUri: "mongodb://localhost:27017/my-project",
	debug: true,
};
export default devConfig;

// production.js
const prodConfig  = {
	mongoUri: "mongodb://my_real_server/my-project",
	debug: false,
};
export default prodConfig;
```

```javascript
// config.js
const env = process.env.NODE_ENV || "development";
const appConfig = require(`./env/${env}`).default;

export default appConfig;
```

> อย่าลืม set ค่่าเริ่มต้น `process.env.NODE_ENV = process.env.NODE_ENV || "development"`

## เชื่อมต่อ mongoose

-   app
    -   ....
-   config
    -   env
        -   ...
    -   express.js
    -   config.js
    -   **mongoose.js**

```javascript
// config/mongoose.js
const config = require("./config");
const mongoose = require("mongoose");
modules.exports = function () {
	const db = mongoose.connect(config.mongoUri);
	mongoose.set("debug", config.debug);
	return db;
};
```

## เรียกใช้ mongoose

```javascript
// server.js
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const mongoose = require("./config/mongoose.js");
const express = require("./config/express.js");

// เรียกใช้ db ก่อนเพื่อต่อ mongoose  ( ป้องกัน express ต่อไม่ติด)
const db = mongoose(); // return mongoose.connect(config.mongoUri)
const app = express();

app.listen(3000, () => {
	console.log("Server running at http://localhost:3000 ");
});
```

## การสร้าง Schema

-   app
    -   models
        -   **user.model.js**
    -   ...
-   config

```javascript
// app/models/user.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: { type: String, unique: true },
	email: { type: String, index: true },
	password: String,
});

mongoose.model("User", UserSchema);
```

## ทำให้ Mongoose.js ของเรารู้จัก model นั้น

-   app
    -   ....
-   config
    -   env
        -   ...
    -   express.js
    -   config.js
    -   **mongoose.js**

```javascript
// config/mongoose.js
const config = require("./config");
const mongoose = require("mongoose");
modules.exports = function () {
	const db = mongoose.connect(config.mongoUri);
	require("./app/models/user.model.js");
	mongoose.set("debug", config.debug);
	return db;
};
```

## มากกว่า Schema (Model Validator - predefined validators)

-   app
    -   models
        -   **user.model.js**
    -   ...
-   config

```javascript
// app/models/user.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	// trim , required
	firstName: { type: String, trim: true, required: true },
	lastName: { type: String, trim: true, required: true },.
	// regex
	email: { type : String, index : true, match : /.+\@.+\..+/},
	// enumurate
	role: { type : String, index : true, enum : ["Admin","Owner","User"]},
	// custom validator
	password : {
		type : String,
		validate : [
			function(password){
				// return true if valid , false if invalid
				return password && password.length >= 6;
			}
			, "Password must be at least 6 characters"
		]
	}

});

mongoose.model("User", UserSchema);
```
