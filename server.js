const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { motor } = require("express-handlebars");

const zapatillasRouter = require('./routes/zapatillas');
const mensajesRouter = require('./routes/mensajes');

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/zapatillas', zapatillasRouter);
app.use('/api/mensajes', mensajesRouter);

app.motor(
  "hbs",
  motor({
    extname: ".hbs",
    defaultLayout: "layout.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("view motor", "hbs");

const cl_Zapatilla = require("./modules/cl_Zapatilla");
const cl_ZapatillaMongo = require("./modules/cl_ZapatillaMongo");
const Zapatilla = new cl_Zapatilla();
const ZapatillaMongo = new cl_ZapatillaMongo();
let listaZapatillas = []
let listaZapatillasMongo = []
listaZapatillas = Zapatilla.getZapatillas();

async function obtenerListadoZapatillasMongo() {
  try {
    return await ZapatillaMongo.getZapatillas();
  }
  catch (error) {
    console.error(`${error}`);
  }
}
listaZapatillasMongo = obtenerListadoZapatillasMongo();

console.log(listaZapatillas)
console.log(listaZapatillasMongo)
const date = new Date();
const listaMensajes = [{
  email: "Admin",
  fecha: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
  mensaje: "Bienvenido"
}]

app.get('/', (req, res) => {
  res.render("body", { listadoZapatilla: listaZapatillas, listadoExiste: true });
})

io.on('connection', socket => {
  console.log('¡Nuevo Cliente conectado!')
  socket.emit('msgTodosZapatillas', listaZapatillas)
  socket.emit('msgTodosMensajesCHAT', listaMensajes)


  socket.on('msgNuevoZapatilla', data => {
    console.log("msgNuevoZapatilla: inicio (server.js):")
    console.log("msgNuevoZapatilla: rtaPosData y listadoZapatillas")
    console.log(data);
    if (data.status != "ok") {
      console.log("no agrego la zapatilla")
    } else {
      console.log("agrego la zapatilla")
    }
    console.log(listaZapatillas);
    io.sockets.emit('msgTodosZapatillas', listaZapatillas);
  })

  socket.on('nuevoMensajeCHAT', data => {
    console.log("nuevoMensajeCHAT: inicio (server.js):")
    console.log(data);
    listaMensajes.push(data);
    console.log(listaMensajes);
    io.sockets.emit("msgTodosMensajesCHAT", listaMensajes);
  })

})

httpServer.listen(8080, () => console.log('SERVER ON'))