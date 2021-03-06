const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();
const cl_MensajesMongo = require("../modules/cl_MensajesMongo");
const MensajeMongo = new cl_MensajesMongo();

router.get("/mostrarTodos", async (req, res) => {
    res.status(200).json(await MensajeMongo.getMensajes());
});

router.post("/agregarMensaje", async (req, res) => {
    let objMensaje = req.body;
    res.status(200).json(await MensajeMongo.insertMensaje(objMensaje));
});

router.get("/normalizado", async (req, res) => {
    res.status(200).json(await MensajeMongo.normalizar());
});

module.exports = router;