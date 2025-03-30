const express = require("express");
const cors = require("cors");

const booksRouter = require("./routes/api/books"); //імпортуємо частину сервера або "аркущ записної книги в сервер"

const app = express(); //створюємо сервер

app.use(cors()); //дозволяємо крос-домени запити, щоб сервер міг приймати запити з інших доменів
app.use("/api/books", booksRouter); //тут кажемо, що коли прийде запит, який починається з api/books, то бери всі шляхи, які починаються з /api/books в booksRouter

app.listen(3000); //слухаємо 3000 порт, щоб сервер міг приймати запити на цьому порту
