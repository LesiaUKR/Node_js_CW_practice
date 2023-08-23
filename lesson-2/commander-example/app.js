const { program } = require("commander");

// const yargs = require("yargs");
// const {hideBin} = require("yargs/helpers");


//в папці books знаходяться данні, а в index.js методи роботи з цими даними
// в CommonJS імпорт прописується як імпорт із папки, але насправді він іде із файлу index.js
const books = require("./books"); // це об'єкт, в якому є функції із файлу index.js в папці books
// console.log(books)

// в функцію передаємо об'єкт, що зробити з книгами
// в цю функцію invokeAction можемо передавати різні екшени і додаткові дані і вона може відслідкувати, яку дію ми просимо зробити
// ця фунуція асинхронна, тому що роботи з файлами є асинхронні
//  id, title, author - бо це є в файлі books.json і ми хочемо зробити якусь дію по id або title або author

/*
const invokeAction = async ({ action, id, title, author }) => {
    
}

invokeAction({ action: "read" }); //прочитає і видасть зміст файлу books.json
invokeAction({ action: 'getById', id: "YxhM4QDxPeA3SmPHcEZPJ" }); //дай нам книгу по id

*/

// доречно використовувати switch case, якщо методів кілька, щоб відсклідковувати різні actions
// фунції під кожну actions прописуємо в файлі index.js, що в папці books

const invokeAction = async ({ action, id, title, author }) => {
    switch (action) {
        case "read":
            const allBooks = await books.getAll();
            return console.log(allBooks);
        case "getById":
            const oneBook = await books.getById(id);
            return console.log(oneBook);
        case "add":
            const newBook = await books.add({ title, author });
            return console.log(newBook);
        case "updateById":
            const updateBook = await books.updateById(id, { title, author });
            return console.log(updateBook);
        case "deleteById":
            const deleteBook = await books.deleteById(id);
            return console.log(deleteBook);
        default:
            return console.log("Unknown action")
    }
}

// invokeAction({ action: "read" }); //прочитає і видасть зміст файлу books.json
// invokeAction({ action: "getById", id: "zCd_RioNMOBaQwAXnc8Px"  }); //прочитає і видасть зміст файлу books.json
// invokeAction({action: "add", title: "Worm", author: "John C.McCrae"});
// invokeAction({action: "updateById", id:"GaSdgvaCprYI604XPHo5d", title: "Ward", "author": "John C.McCrae"})

// вище ми самі запускаємо той чи інший метод, викликом функції, але щоб його можна було викликати із командної строки,
// використаємо process.argv
// Те що написано в командному рядку Node.js зберігає в такій глобальній змінній як process.argv, що представляє собою масив, де
// перший аргумент - це шлях до Node.js на комп'ютері, другий аргумент - це  шлях до файлу, а третій четвертий і далі це елементи масиву,
// які представляють собою слова, які людина написала, тобто в прикладі нижче "node" - 1й аргумент, "app" - 2й аргумент і т.д.
// node app --action getById --id dkJSszfrRVtLVR_MfRqcu -

// код нижче виконує натупне
// дивимося чи є в масиві слово action
// якщо немає, то повернеться індекс -1
// перевіряємо за цією умовою і якщо індекс не дорівнює мінус -1, то знаходимо наступний за словом action елемент
// тобто метод, який треба запустити -  const action = process.argv[actionIndex + 1]; - видасть в консолі із команді  node app --action getById слово getById
// вставляємо це слово в функцію invokeAction для запуску

/*
const actionIndex = process.argv.indexOf("--action"); //дивимося чи є в масиві слово action
if(actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    // console.log(action);
    invokeAction({action})
}
*/
// так як вище не зручно, краще щоб те, що написано через два дефіси, тобто слово action,
//  було ключем, а наступне слово значенням
//  для оптимально використовувати два пакети, щоб прописати нормальний консоль-оператор
// перший такий пакет - це yargs, який треба встановити yarn add yargs або npm i yargs
// потім імпортувати пакет в файлі - const yargs = require("yargs");
// в документації пишеться про імпорт окремих функцій наприклад const {hideBin} = require("yargs/helpers");

/*

const arr = hideBin(process.argv); //закидаємо в фунцію hideBin наш process.argv, тобто масив з actions
const {argv} = yargs(arr);
console.log(argv); //{ _: [], action: 'getAll', '$0': 'app' } - нам повернеться об'єкт, в якому є action: 'getAll', і об'єкт з action: 'getAll'
//  передаємо в invokeAction
invokeAction(argv);

*/

// так, як yargs перетворює числовий id в число, а у нас в json зберігається id як строка,
// то в код треба подописувати const bookId = String(id);



// другий спосіб створення консоль-оператора - це пакет commander
// який встановлюємо наприклад через yarn add commander
// він трохи складніший в налаштуваннях, але в нього більше опцій
// const {program} = require("commander")
// в {program} вказуємо, які ми очікуємо команди
// в program викликаємо метод option і вказуємо назву команд, а через кому її значення <type>
// якщо просто прописати --action, то поверне true або false, а якщо ми очікуємо якесь значення то вказуємо <type> - тобто
// матимемо program.option("-a, --action, <type>")
// потім викликаємо program.parse();
// потім викликаємо в program метод opts і він нам повертає об'єкт з тим, що ми написали в консолі

program
    .option("-a, --action, <type>")
    .option("-i, --id, <type>")
    .option("-t, --title, <type>")
    .option("-at, --author, <type>");

program.parse();

const options = program.opts();
console.log(options);
invokeAction(options)
