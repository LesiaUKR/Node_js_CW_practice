const express = require("express");
const cors = require("cors");

const booksRouter = require("./routes/api/books"); //імпортуємо частину сервера або "аркущ записної книги в сервер"

const app = express();

app.use(cors());

app.use("/api/books", booksRouter); //тут кажемо, що коли прийде запит, який починається з api/books, то бери всі шляхи, які починаються з /api/books в booksRouter

app.listen(3000);

