const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");



// може виникати помилка "не можу знайти файл "при вказуванні вдносного шляху "./books.json" в const data = await fs.readFile("./books.json", "utf-8")
// бо "./books.json" це відносний шлях відносно місця, де викликається. Якшо вона наприклад викликається в app.js, який знаходиться в корні,
//тому шукати файл і буде в корні проекту
// Так як наперед не знаємо де будемо викликати ф-ю, тому нам треба зробити так, щоб де б не викликалася функція, щоб файл books.json шукався в одному місці
// для цього треба вказати не відносний шлях, а абсолютний, тобто повний шлях
//dirname - це глобальна змінна в Node.js. dirname - це
// console.log(__dirname) // тобто буквально шлях, де знаходиться файл index.js C:\Users\user\OneDrive\Документы\GitHub\Node.js-56-57\lesson-2\commander-example\books
//тому можемо записати так const data = await fs.readFile(`${__dirname}/books.json`, "utf-8");

// const getAll = async () => {
//     const data = await fs.readFile(`${__dirname}/books.json`, "utf-8");
//     return JSON.parse(data);
// }

// правильніше стоворювати шляхи використовуючи пакет path, який вже вбудодований в node.js як і пакет fs
// в пакеті pzth є метод join, який об'єднує шматчки шляхів в один великий шлях
// path нормалізує шлях, бо дивиться в якій ОС запускається і правильно розставляє слеші 

const booksPath = path.join(__dirname, "books.json"); 
// console.log(booksPath)

// пишемо функції, які будуть працювати з книгами, щоб у будь-якому місці в програмі можна було імпортувати
// ці функції і працювати з книгами
// наприклад, функція нижче повертає всі книги
// оскільки ми поміщуємо buffer в JSON.parse, то він його перетворює на масив об'єктів

const getAll = async () => {
    const data = await fs.readFile(booksPath);
    console.log(data);
    return  JSON.parse(data);
   
}

// щоб знайти книгу по id, спочатку треба отримати всі книги, а потім шукати потрібну
// так як в нас вже є метод getAll для отримання всіх книг, то записуємо як нижче
// так як ми імітуємо роботу бази данних, то якщо ввести неіснуючий id, то повернеться undefined,
// тому треба записати так return result || null;, бо коли база данних нічого не знаходить, то повертає null


const getById = async (id) => {
    // const bookId = String(id); //бо yargs робить з id число, а в json у нас строка
    const books = await getAll();
    const result = books.find(item => item.id === id);
    return result || null;
}

// Додати книгу - пишемо функцію додавання, яка отримує данні title, author, і отримуємо об'єкт, який
// ми маємо записати в json і повернути, при чому додавши id, який генеруємо наприклад з nanoid.
// або якщо в житті, то маємо передати об'єкт в базу данних
// база данних генерує сама id для нового об'єкта
// версія nanoid 4.0 не працює з CommonJS лише з  ES6 модулями
// для CommonJS треба встановити версію 3.3.4
// ми не можемо використати appendFe (е одна з функцій модуля fs (File System) в Node.js. ),
// бо ця функція використовується для додавання даних до кінця вже існуючого файлу,
// а нам треба в сам масив. Тому ми спочатку створюємо нову книгу
// const newBook = {
    //     id: nanoid(),
    //     ...data,
    // }
// куди  розпилюємо нову data, тобто  title, author і додаємо id
// потім беремо всі книжки const books = await getAll(); і запушуємо в цей масив нову книгу books.push(newBook);
// а потім  весь файл books.json перезаписуємо await fs.writeFile(booksPath, JSON.stringify(books));
// потім повернути нову книгу return newBook;
// щоб stringify не записав нам JSON однією великою строкою, то треба додати аргументи null, 2, де null - це другий аргумент, якщо потрібно заміна одних 
// символів на інші, а 2 - третій агрумент - кількість відступів 

const add = async(data) => {
    const books = await getAll();
    const newBook = {
        id: nanoid(),
        ...data,
    }
    books.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return newBook;
}

// Редагування об'єкта із файла, який вибирається по id
// знаходимо книгу, яку треба оновити по індексу
// метод findIndex повертає -1, якщо не знаходить дані
const updateById = async (id, data) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    books[index] = {id, ...data}; //перезаписуємо масив, в масиві об'єкт
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
}


// Видаляємо книгу по id
// const [result] = books.splice(index, 1); - splice видаляє, потім вирізає і повертає масив того що вирізав
// перезаписуємо файл після видалення   await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
// якщо перед функцією, яка повертає проміс поставити await, то вона поверне не проміс, а результат його виконання

const deleteById = async(id) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = books.splice(index, 1);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return result;
}
// коли багато інструментів, ми їх експортуємо як методи об'єкту

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}