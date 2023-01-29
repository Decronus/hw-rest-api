const router = require("express").Router();

const {
    getAllBooks,
    getBookById,
    updateBook,
    createBook,
    deleteBook,
} = require("../controllers/books");

router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/books", createBook);
router.patch("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
