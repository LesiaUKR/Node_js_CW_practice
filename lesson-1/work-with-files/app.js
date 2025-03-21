// import fs from "node:fs"; // стара версія, яка використовує колбеки
import fs from "node:fs/promises"; // нова версія, яка використовує проміси
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";
// const fs = require("fs/promises"); // динамічного імпорту з використанням синтаксису ES6
// const fs = require("fs").promises; - аналогічний попередньому запис
// console.log(fs);
// 1. Прочитати зміст файлу
// якщо читати файл якого немає - видасть помилку
// const readFile = async () => {
//   //   const text = await fs.readFile("./files/file.txt", "utf-8");
//   //   console.log(text);
//   //   const buffer = await fs.readFile("./files/file.txt"); //fs не знає, в якій системі закодований текст, тому повертає його в 16річній системі
//   // є способи передати з буфера розкодований текст.
//   // Перший це викликати метод toString(), який повертає текстовий зміст змінної. Якщо це функція - то поверне тіло функції
//   // метод toString() - якщо його викликати на буфері, то він проведе стандартне перекодування в стандарті кодування UTF8
//   //   const text = buffer.toString(); //щоб отримати текст із буфера, бо в ньому текст закодований
//   //   console.log(text);

//   // другий простіший варіант - передати  стандарт кодування "utf-8" другим
//   // аргументом - const text = await fs.readFile("./files/file.txt", "utf-8"); і тоді відразу отримаємо текст

//   // третій варіант - використати бібліотеку detect-file-encoding-and-language - вона визначить кодування файлу
//   // і поверне об'єкт з кодуванням і мовою
//   const result = await DetectFileEncodingAndLanguage("./files/file.txt");
//   console.log(result);
//   const { encoding } = result;
//   const text = await fs.readFile("./files/file.txt", encoding);
//   console.log(text);
// };

// readFile();

// 2. Дописати у файл текст - використовуємо команду appendFile,
// де перший аргумент шлях до файлу, а другий що хочемо дописати
// використовуємо слеш на початку, якщо хочемо записати з нового рядка
// Цей метод дописує в самий кінець, але повертає undefined
// якщо дописувати файл якого немає - помилки не буде, бо Node.js створить файл і потім запише
// те саме буде, коли перезаписувати файл

// const addText = async () => {
//   // appendFile - не повертає новий зміст файлу, але нічого не повертає і буде undefined в консолі,
//   // тому немає сенсу виводити результат в консоль
//   const appendResult = await fs.appendFile(
//     "./files/file2.txt",
//     "\nТак говорил Заратустра"
//   );
//   console.log(appendResult); //undefined
// };

// addText();

// 3. Перезаписати зміст файлу - використовуємо команду writeFile, яка видаляє все що було і записує нове
// також повертає undefined, тому немає сенсу виводити результат в консоль

const replaceText = async () => {
  const result = await fs.writeFile("./files/file3.txt", "Ницше");
  console.log(result); //undefined
};

replaceText();

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data) => {
//     console.log(error);
//     console.log(data);
// })
