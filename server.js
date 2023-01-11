const express = require("express");
const app = express();
const db = require("./app/models");

const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:3006"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Server works!" })
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})