const mongoose = require('mongoose');

const book = mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        sub_genre: {
            type: String,
            required: true
        },
        ISBN: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model("Books", book)