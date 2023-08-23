const express = require("express");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");

const books = require("./books");

const app = express();

// CORS - cross original request, що означає запит з однієї адреси на іншу, що блокує запити з фронтенду на бек при розробці
// веб-сервери в таких запитах відмовляють
// так як на етапі розробки не може такого бути, щоб фронт та бек були на одній адресі, на одному сервері
// тобто хоча б на етапі розробки потрібно дозволити кросдоменні запити
// це вирішується встановленням пакуту cors (yarn add cors)
// імпортуємо cors - це спеціальна функція, яку треба викликати і яка повертає Middleware

// const corsMiddleware = cors(); //викликаємо і отримуємо Middleware, де всередні йде маніпуляція із заголовками, щоб дозволити кросдоменні запити 
// app.use(corsMiddleware);
// можна скоротити запис до однієї строки
app.use(cors());


/*
// Розберемо, коли ж потрібні Middleware
// наприклад, коли треба записати в окремий файл server.log інформацію про логування (перелік запитів і час запиту) використовують наступну функцію
// яку пишуть з допомогою Middleware
// щоб зафіксувати час використовується метод moment 
*/
// app.use( async(req, res, next)=> {
//     const {method, url} = req; //беремо вид методу і шлях (GET /books) для запису в server.log
//     const date = moment().format("DD-MM-YYYY_hh:mm:ss"); //фіксуємо час запиту (16-02-2023_08:25:13)
//     await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`); //записуємо в файл
//     next();
// })

/*
// щоб запустити Middleware використовуємо метод use
// важливо розуміти, що express в файлі шукає потрбіний маршрут чи запит в файлі зверху вниз перевіряючи кожен
// знайшовши потрібний далі express не йде

// коли використовуємо метод use, то такий запис як нижче підходить для будь-якого маршруту
// підійшовши до такої функції наприклад з запитом на books або на product буде виконана функція нижче
// тобто до виконання запиту get express не дійде
// Middleware використовують для якоїсь проміжної дії, яку треба виконати до виконання запиту
// щоб express все-таки шукав далі використовується  функція next() третім аргументом
*/

// це розбирали, що таке Middleware
/*
app.use((req, res, next) => {
    console.log("First middleware");
    next();
});

// це розбирали, що таке Middleware
// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// })
*/

app.get("/products", async(req, res)=> {
    res.json([]);
});

app.get("/books", async (req, res) => {
    res.json(books);
});

// це функція для відповіді, коли немає сторінки, яка була в запиті
// це ще один приклад використання Middleware
// відпровідь приходить у форматі json

app.use((req, res)=> {
    res.status(404).json({
        message: "Not found"
    })
})

app.listen(3000); //запускаємо веб-сервер