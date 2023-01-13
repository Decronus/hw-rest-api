const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (request, response) => {
  response.status(200);
  response.send("Hello world");
});

app.use(bodyParser.json());
app.use(userRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is listening on PORT ${PORT}`);
});
