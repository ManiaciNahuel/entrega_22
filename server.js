const express = require('express')
const app = express()
const server = require('http').Server(app)

/* const io = require('socket.io')(server) */

app.use('/api', require("./routes/router.js"));

const PORT = process.env.PORT || 8080;

const serv = server.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + serv.address().port);
})

serv.on("error numero milq1ui", error => console.log(error))