const fs = require("fs/promises");
// const fs = require("fs").promises; - анаогічний попередньому запис

// 1. Прочитати зміст файлу
// якщо читати файл якого немає - видасть помилку
// const readFile = async() => {
//     // const text = await fs.readFile("./files/file.txt", "utf-8");
//     console.log(text);
//     const buffer = await fs.readFile("./files/file.txt"); //fs не знає, в якій системі закодований текст, тому повертає його в 16річній системі
//     // є два способи передати з буфера розкодований текст.
//     // Перший це викликати метод toString(), який повертає текстовий зміст змінної. Якщо це функція - то поверне тіло функції
//     // метод toString() - якщо його викликати на буфері, то він проведе стандартне перекодування в стандарті кодування UTF8
//     const text = buffer.toString(); //щоб отримати текст із буфера, бо в ньому текст закодований
//     console.log(text)

//     // другий простіший варіант - передати  стандарт кодування "utf-8" другим
//     // аргументом - const text = await fs.readFile("./files/file.txt", "utf-8"); і тоді відразу отримаємо текст
// }

// readFile()

// 2. Дописати у файл текст - використовуємо команду appendFile,
// де перший аргумент шлях до файлу, а другий що хочемо дописати
// використовуємо слеш на початку, якщо хочемо записати з нового рядка
// Цей метод дописує в самий кінець, але повертає undefined
// якщо дописувати файл якого немає - помилки не буде, бо Node.js створить файл і потім запише
// те саме буде, коли перезаписувати файл
/*
const addText = async()=> {
    await fs.appendFile("./files/file2.txt", "\nТак говорил Заратустра");
}

// 3. Перезаписати зміст файлу - використовуємо команду writeFile, яка видаляє що було і записує нове
addText();
*/
/*
const replaceText = async()=> {
    const result = await fs.writeFile("./files/file3.txt", "Ницше");
    console.log(result);
}

replaceText();

*/
// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data) => {
//     console.log(error);
//     console.log(data);
// })