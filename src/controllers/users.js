let usersData = [
  {
    id: 0,
    name: "Ivan",
    email: "ivan@mail.ru",
    books: ["Атлант расправил плечи", "Герой нашего времени"],
  },
  { id: 1, name: "Alex", email: "alex@yandex.ru", books: ["Недоросль"] },
  { id: 2, name: "Petr", email: "petr@gmail.com", books: ["Евгений Онегин"] },
  {
    id: 3,
    name: "Alisa",
    email: "alisa@yahoo.com",
    books: ["Гарри Поттер и Узник Азкабана"],
  },
  { id: 4, name: "Maria", email: "maria@mail.ru", books: ["Властелин Колец"] },
];

const getUsers = (request, response) => {
  response.status(200);
  response.send(usersData);
};

const getUserById = (request, response) => {
  const { id } = request.params;

  if (!usersData.find((user) => user.id === +id)) {
    response.status(500);
    response.send("Пользователя с таким id не существует");
  }

  response.status(200);
  response.send(usersData.find((user) => user.id === +id));
};

const createUser = (request, response) => {
  if (!request.body.name || !request.body.email) {
    response.status(500);
    response.send("Указаны не все обязательные свойства");
    return;
  }

  response.status(201);

  const newUser = request.body;
  newUser.id = Date.now();

  usersData.push(newUser);
  response.send(request.body);
};

const updateUser = (request, response) => {
  const { id } = request.params;

  if (!usersData.find((user) => user.id === +id)) {
    response.status(500);
    response.send("Пользователя с таким id не существует");
  }

  const { name, email } = request.body;

  response.status(200);

  const user = usersData.find((user) => user.id === +id);

  if (name) user.name = name;
  if (email) user.email = email;

  usersData = usersData.filter((user) => user.id !== +id);
  usersData.push(user);

  response.send(user);
};

const deleteUser = (request, response) => {
  const { id } = request.params;

  if (!usersData.find((user) => user.id === +id)) {
    response.status(500);
    response.send("Пользователя с таким id не существует");
    return;
  }

  response.status(200);

  usersData = usersData.filter((user) => user.id !== +id);
  response.send("Пользователь успешно удалён");
};

const takeBook = (request, response) => {
  const { id } = request.params;

  if (!usersData.find((user) => user.id === +id)) {
    response.status(500);
    response.send("Пользователя с таким id не существует");
  }

  const { book } = request.body;

  const user = usersData.find((user) => user.id === +id);
  if (user.books.includes(book)) {
    response.status(500);
    response.send("У пользователя уже есть такая книга");
    return;
  }
  usersData = usersData.filter((user) => user.id !== +id);

  user.books.push(book);
  usersData.push(user);

  response.status(201);
  response.send("Книга успешно добавлена");
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
  takeBook,
  giveBook,
};
