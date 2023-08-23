// другий спосіб підключення використання ES6, за якого не треба використовувати розширення файлів  mjs 
// і при запуску не треба вказувати mjs  в package.json в "start": "node index.mjs",,а додати в package.json "type": "module"
import users from "./users.js";
import {getCurrentMonth} from "./date/index.js";

console.log(users);





















