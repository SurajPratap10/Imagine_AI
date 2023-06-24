const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config({path: "./config/config.env"});
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// MIDDLEWARES:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL, methods: ["GET", "POST", "PUT", "DELETE"]}));

//STATIC FOLDER:
app.use(express.static(path.join(__dirname, "public")));
app.use("/openai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
