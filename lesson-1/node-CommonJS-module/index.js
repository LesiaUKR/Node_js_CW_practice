// CommonJS
const nodemon = require("nodemon");

const obj = require("./users");
console.log(obj);

const {admins} = require("./users");
console.log(admins);

const {getCurrentMonth} = require("./date"); //імпортуємо змінну з файлу index.js, що в папці date
const currentMonth = getCurrentMonth(); //знаходимо поточний місяць
console.log(`Now ${currentMonth} month`);

// нам треба насправді поточний місяць, а не сама функція, тому можна зробити так,
// щоб під час імпорту відразу викликати інструмент
// const currentMonth = require("./date").getCurrentMonth(); //відразу викликаємо інструмент прямо під час імпорту,
// коли потрібно один раз викликати інструмент. Тоді в змінну currentMonth записується не функція, а результат її виконання
// так пишуть не часто, але цей спосіб можна використовувати
// console.log(`Now ${currentMonth} month`);

























