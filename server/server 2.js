/* ==== Dotenv Require ==== */
require("dotenv").config();

/* ==== External Modules ==== */
const path = require("path");
const express = require("express");
const cors = require("cors");

/* ==== Internal Modules ==== */
const routes = require("./routes");

/* ==== Instanced Modules  ==== */
const app = express();

/* ====  Configuration  ==== */
const PORT = process.env.PORT || 5000;

/* ====  Middleware  ==== */
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build"))); // to serve static files and to serve the react build
app.use(express.static("public"));
app.use(express.json()); // JSON parsing middleware
app.use((req, res, next) => {
    console.log(req.url);
    console.log("Auth header: ", req.headers.authorization);
    if (req.body) {
        console.log("Request body received: ", req.body);
    }
    next();
});

/* ====  Routes & Controllers  ==== */
app.use("/api", routes);
app.all("/api/*", function (req, res, next) {
    res.send("Where you going? This is not route.");
});
app.use((req, res, next) => {
    console.log(req.headers);
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

/* ====  Server Listener / Connection ==== */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}! Dope!`);
});