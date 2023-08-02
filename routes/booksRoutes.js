const express = require('express');
const router = express.Router();

const booksController = require("../controllers/booksController");

// GET get all books
router.get("/", booksController.getAll);

// POST add book 
router.post("/addBook", booksController.addBook);

// POST get a book using any param 
router.get("/get/:param", booksController.getBook);

// DELETE delete a book using ISBN
router.delete("/delete/:isbn", booksController.deleteBook);

// PUT update a book using _id
router.put("/update/:_id", booksController.updateBook);


module.exports = router;