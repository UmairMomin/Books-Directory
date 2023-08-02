const Books = require('../models/booksModel');

// GET get all books (/books)
const getAll = async (req, res) => {
    try {
        const books = await Books.find();
        if (books) {
            if (books.length === 0) {
                res.status(400).send({ success: false, msg: "No books are there!" });
            } else {
                res.status(200).send({ success: true, data: books });
            }
        } else {
            res.status(400).send({ success: false, msg: "No Collection found" });
        }
    } catch (err) {
        throw err;
    }
};

// POST add book (/books/addBook)
const addBook = async (req, res) => {
    try {
        const book = new Books({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            sub_genre: req.body.sub_genre,
            ISBN: req.body.ISBN
        })
        const bookData = await Books.findOne({ ISBN: req.body.ISBN });
        if (bookData) {
            res.status(400).send({ success: false, msg: "This book already exists!" });
        } else {
            const book_data = await book.save();
            res.status(200).send({ success: true, msg: "Book Successfully Added!", data: book_data });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, msg: "Something Went Wrong!" });
    }
};

// POST get a book using any param (/books/get/:param)
const getBook = async (req, res) => {
    try {
        const param = req.params.param;
        const book_data = await Books.find({
            $or: [
                { _id: param },
                { title: param },
                { author: param },
                { genre: param },
                { sub_genre: param },
                { ISBN: param }
            ]
        });

        if (book_data) {
            if (book_data.length === 0) {
                res.status(400).send({ success: false, msg: "No such books found!" });
            } else {
                res.status(200).send({ success: true, msg: `Books fetched of param: ${param}`, data: book_data });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, msg: "Something Went Wrong!" });
    }
};

// DELETE delete a book using ISBN (/books/delete/:isbn)
const deleteBook = async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const deleteBook = await Books.findOneAndDelete({ ISBN: isbn });
        if (deleteBook) {
            res.status(200).send({ success: true, msg: "Book Deleted Successfully!", data: deleteBook });
        } else {
            res.status(400).send({ success: false, msg: "No such book found!" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, msg: "Something Went Wrong!" });
    }
};

// PUT update a book using _id (/books/update/:_id)
const updateBook = async (req, res) => {
    try {
        const _id = req.params._id;
        const updateBook = await Books.findOneAndUpdate(
            { _id: _id },
            { $set: req.body },
            { new: true }
        );
        if (updateBook) {
            if (updateBook.length === 0) {
                res.status(400).send({ success: false, msg: "No such books found!" });
            } else {
                res.status(200).send({ success: true, msg: `Books update of id: ${_id}`, data: updateBook });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, msg: "Something Went Wrong!" });
    }
};

module.exports = {
    getAll,
    addBook,
    getBook,
    deleteBook,
    updateBook
}