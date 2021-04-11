const express = require("express");
const server = express();
const routes = require("./routes.js");

//usando template engine - renderizando o HTML antes de enviar ao servidor
server.set('view engine', 'ejs');

//usar o req.body
server.use(express.urlencoded({extended: true}))

//habilitar arquivos estáticos
server.use(express.static("public"));

server.use(routes);

server.listen(3003, () => console.log('ok'));