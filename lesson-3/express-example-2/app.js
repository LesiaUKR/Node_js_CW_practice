// const express = require("express");
import express from "express"; //1. імпортуємо express
// const books = require("./books");
import books from "./books.js"; // імпортуємо масив books з файлу books.js

const app = express();

// в першому прикладі веб сервер відправляв у відповідь html, але найчастіше веб сервер відправляє дані у форматі json масив або об'єкт\

// відправляємо у відповідь на запит GET масив об'єктів books за допомогою методу send
// щоб отримати відповідь просто в адресну строку пишемо localhost:3000/books
// коли пишемо backend повинні перевірити всі відповіді
// перевіряємо/тестуємо через POSTMAN
// правильніше використовувати json метод щоб відправити відповідь, тобто res.json(books),
// бо send не вміє оброблювати null

app.set("json spaces", 8); //форматування json, щоб було з відступами, а не в одну строку,використовуємо з методом send

app.get("/books", (req, res) => {
  const databaseResponse = null; //моделюємо ситуацію з відправкою null базою данних
  // res.json(databaseResponse); //моделюємо ситуацію з відправкою null базою данних
  // res.send(databaseResponse); // метод send не вміє оброблювати null, тому буде помилка
  res.json(books); //самий правильний варіант відправки відповіді через json
  // res.send(books); //щоб отримати відповідь просто в адресну строку пишемо localhost:3000/books
});

app.listen(3000);
