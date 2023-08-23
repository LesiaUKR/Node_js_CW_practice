const express = require("express");

const books = require("../../data/books");

const router = express.Router(); //викликаємо метод express Router, що створює об'єкт міні додатку або "аркуш записної книжки", а не нову книжку


// REST API - це поради, методологія як написати веб-сервер, який може реалізувати CRUD операції
// CRUD: C - create; R - read; U - update; D - delete
// REST API - основні правила:
// 1. кінцева точка запиту (endpoint) - завжди іменник в множині (/products; /orders; /users)
// 2. CRUD - операція що робити визначає HTTP-метод запиту, а не адреса:
// GET /products - поверне всі товари
// POST /products - додасть новий товар
// 3. Звернення до окремої одиниці проходить через /:id (параметри маршрута):
// GET /products/:id - поверне товар з id, вказанним в адресному рядку
// PUT /products/:id - обновить товар з id, вказанним в адресному рядку

// REST API - додаткові правила
// 1. адресу запиту краще починати з /api:
// - /api/products
// - /api/orders
// 2. версія API вказується в адресі:
// - /api/v1/products
// - /api/v1/orders
// 3. код відповіді вказує на те, як пройшла обробка запита на сервері
// 4. При додаванні/оновленні сутності потрібно повертати доданий в базу данних об'єкт з id

//Групи відповідей- статус відповіді 


router.get("/", (req, res)=> {
    res.json(books);
})

router.get("/:id", (req, res)=> {
    res.json(books[0])
})

router.post("/", (req, res)=> {
    res.json(books[0])
})

router.put("/:id", (req, res)=> {
    res.json(books[0])
})

router.delete("/:id", (req, res)=> {
    res.json(books[0])
})

module.exports = router;