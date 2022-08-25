const express = require('express')
const router = express.Router()
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const ContenedorDB = require('../contenedores/contenedorDB.js')
const { sqlProducts, sqlMensajes } = require('../options/mariaDB.js');
const productos = new ContenedorDB(sqlProducts.config, sqlProducts.table)
const mensajes = new ContenedorDB(sqlMensajes.config, sqlMensajes.table)

router.get('/productos', async(req, res) => {
    res.json(await productos.getAll())
})

router.get('/productos/:id', async(req, res) => {
    res.json(await productos.getOne(req.params.id))
})

router.post('/productos', async(req, res) => {
    const newObject = req.body
    res.json(await productos.postNew(newObject))
})

router.put('/productos/:id', async(req, res) => {
    const newObject = req.body
    const id = req.params.id
    res.json(await productos.upload(newObject, id))
})

router.delete('/productos/:id', async(req, res) => {
    const id = req.params.id
    res.json(await productos.delete(id))
});

module.exports = router;