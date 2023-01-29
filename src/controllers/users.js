const User = require("../models/user");

const getUsers = (request, response) => {
    return User.find()
        .then((data) => {
            response.status(200).send(data);
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const getUserById = (request, response) => {
    const { id } = request.params;

    return User.findById(id)
        .then((user) => {
            response.status(200).send(user);
        })
        .catch((error) =>
            response.status(500).send("Пользователь с таким ID не найден")
        );
};

const createUser = (request, response) => {
    if (!request.body.name || !request.body.surname || !request.body.username) {
        response.status(500).send("Указаны не все обязательные свойства");
        return;
    }

    return User.create({ ...request.body })
        .then((user) => {
            response.status(201).send(user);
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const updateUser = (request, response) => {
    const { id } = request.params;

    return User.findByIdAndUpdate(id, { ...request.body })
        .then((user) => {
            if (user) {
                const updatedUser = JSON.parse(JSON.stringify(user));

                for (let key in request.body) {
                    updatedUser[key] = request.body[key];
                    console.log(key);
                }
                response.status(200).send(updatedUser);
            } else {
                response.status(404).send("Пользователь с таким ID не найден");
            }
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const deleteUser = (request, response) => {
    const { id } = request.params;

    return User.findByIdAndDelete(id)
        .then((user) => {
            if (user) {
                response.status(200).send(user);
            } else {
                response.status(404).send("Пользователь с таким ID не найден");
            }
        })
        .catch((error) =>
            response
                .status(500)
                .send("Произошла ошибка сервера при выполнении запроса")
        );
};

const giveBook = (request, response) => {
    const { id } = request.params;

    if (!usersData.find((user) => user.id === +id)) {
        response.status(500);
        response.send("Пользователя с таким id не существует");
    }

    const { book } = request.body;

    const user = usersData.find((user) => user.id === +id);

    if (!user.books.includes(book)) {
        response.status(500);
        response.send("Пользователь не может отдать книгу, которой у него нет");
        return;
    }
    usersData = usersData.filter((user) => user.id !== +id);

    user.books.splice(user.books.indexOf(book, 1));
    usersData.push(user);

    response.status(200);
    response.send("Книга успешно удалена");
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    giveBook,
};
