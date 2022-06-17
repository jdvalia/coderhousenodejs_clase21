const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();
const { faker } = require("@faker-js/faker");
const cl_Zapatilla = require("../modules/cl_Zapatilla");
const cl_ZapatillaMongo = require("../modules/cl_ZapatillaMongo");
const { isConstructorDeclaration } = require("typescript");
const Zapatilla = new cl_Zapatilla();
const ZapatillaMongo = new cl_ZapatillaMongo();

const getFormatoAleatorio = id => ({
    id,
    title: faker.name.firstName(),
    price: faker.finance.amount(),
    thumbnail: faker.image.avatar()
})

router.get("/", (req, res) => {
    res.status(200).json(Zapatilla.getZapatillas());
});

router.get('/mostrarTodos', async (req, res) => {
    res.status(200).json(await ZapatillaMongo.getZapatillas());
})

router.get('/mostrarCincoAleatorios', (req, res) => {
    const numeroElementos = 5
    const listadoZapatillasAleatorios = []
    for (let i = 0; i < numeroElementos; i++) {
        listadoZapatillasAleatorios.push(getFormatoAleatorio(i))
    }
    res.status(200).json(listadoZapatillasAleatorios)
})

router.get("/agregarCincoAleatorios", async (req, res) => {
    console.log("entro a router.get /zapatillasMongo");
    res.status(200).json(await ZapatillaMongo.addZapatillasAleatorios());
});

module.exports = router;