const express = require('express');
let app = express();
port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongodb database connection
const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/BookDirectory", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });


// Routes
const indexRoute = require("./routes/booksRoutes");


app.use("/books", indexRoute);

app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log(`Server started on ${port}`);
    }
});