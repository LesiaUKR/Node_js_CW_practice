//збираємо всі схожі інструменти(функції) в одному файлі index.js, а потім робимо ре-експорт
const getCurrentMonth = require("./getCurrentMonth");
const isLeapYear = require("./isLeapYear");

// робимо ре-експорт
module.exports = {
    getCurrentMonth,
    isLeapYear,
}

// потім вже в основному файлі index.js робимо імпорт
