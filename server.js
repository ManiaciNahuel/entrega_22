const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { faker } = require('@faker-js/faker');
faker.locale = "es";

function newElement() {
    const element = {
        nombre: faker.commerce.product(),
        precio: faker.finance.amount(),
        imagen: faker.image.technics(650, 600, true)
    }
    return element
}
async function generarProdutos() {
    for (let index = 0; index < 5; index++) {
        products.push(newElement())
    }
}
let products = []
generarProdutos()
console.log(products);

//Connection
const ContenedorDB = require('./contenedores/contenedorDB.js')
const { sqlProducts, sqlMensajes } = require('./options/mariaDB.js');
const productos = new ContenedorDB(sqlProducts.config, sqlProducts.table)
const mensajes = new ContenedorDB(sqlMensajes.config, sqlMensajes.table)

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', productos);

    socket.on('new-product', function(data) {
        productos.push(data);
        io.sockets.emit('productos', productos);
    });
});

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

app.use('/api', require("./routes/router.js"));

const PORT = process.env.PORT || 8080;

const serv = server.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + serv.address().port);
})

serv.on("error numero milq1ui", error => console.log(error))