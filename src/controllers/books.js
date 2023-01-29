const book = require("../models/book");
const Book = require("../models/book");
const User = require("../models/user");

const getAllBooks = (request, response) => {
    return Book.find().then((data) => {
        response.status(200).send(data);
    });
};

const getBookById = (request, response) => {
    const { id } = request.params;
    return Book.findById(id).then((book) => {
        response.status(200).send(book);
    });
};

const createBook = (request, response) => {
    if (!request.body.header || !request.body.author) {
        response.status(500).send("Указаны не все обязательные свойства");
        return;
    }

    return Book.create({ ...request.body })
        .then((book) => {
            response.status(201).send(book);
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const updateBook = (request, response) => {
    const { id } = request.params;

    return Book.findByIdAndUpdate(id, { ...request.body })
        .then((book) => {
            if (book) {
                const updatedBook = JSON.parse(JSON.stringify(book));

                for (let key in request.body) {
                    updatedBook[key] = request.body[key];
                }
                response.status(200).send(updatedBook);
            } else {
                response.status(404).send("Книга с таким ID не найдена");
            }
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const deleteBook = (request, response) => {
    const { id } = request.params;

    return Book.findByIdAndDelete(id)
        .then((book) => {
            if (book) {
                response.status(200).send(book);
            } else {
                response.status(404).send("Книга с таким ID не найдена");
            }
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
