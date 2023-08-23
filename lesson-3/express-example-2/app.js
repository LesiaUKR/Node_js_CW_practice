const express = require("express");

const books = require("./books");

const app = express();

// в першому прикладі веб сервер відправляв у відповідь html, але найчастіше веб сервер відправляє дані у форматі json масив або об'єкт\

// відправляємо у відповідь на запит GET масив об'єктів books за допомогою методу send
// щоб отримати відповідь просто в адресну строку пишемо localhost:3000/books
// коли пишемо backend повинні перевірити всі відповіді
// перевіряємо/тестуємо через POSTMAN
// правильніше використовувати json метод щоб відправити відповідь, тобто res.json(books), бо send не вміє оброблювати null

app.get("/books", (req, res)=> {
    const databaseResponse = null; //моделюємо ситуацію з відправкою null базою данних
    // res.json(databaseResponse); //моделюємо ситуацію з відправкою null базою данних
    // res.send(databaseResponse);
    res.json(books); //самий правильний варіант відправки відповіді через json
    // res.send(books); //щоб отримати відповідь просто в адресну строку пишемо localhost:3000/books
})

app.listen(3000);