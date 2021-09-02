/* ==== DOT ENV ==== */
require("dotenv").config();

/* ==== External Modules ==== */
const path = require("path");
const express = require("express");
const cors = require("cors");

/* ==== Internal Modules ==== */
//const routes = require("./routes");
// require("./config/database");

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
    // is there an auth header
    console.log("AUTH HEADER: ", req.headers.authorization);
    if (req.body) {
        console.log("BODY BEING SENT: ", req.body);
    }
    next();
}); // Custom Logger of URL anr req.body

/* ====  Routes & Controllers  ==== */
// app.use("/api", routes);
app.all("/api/*", function (req, res, next) {
    res.send("Where you going? This is not route.");
});
app.use((req, res, next) => {
    console.log(req.headers);
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

/* ====  Server Listener / Connection ==== */
// start express server on port 5000
app.listen(PORT, () => {
    console.log("server started on port 5000");
});