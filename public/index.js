const socket = io();

async function getData(url) {
    try {
        const rtaFech = await fetch(url);
        if (!rtaFech.ok) {
            throw { error: rtaFech.status, statusText: rtaFech.statusText }
        }
        let rtaObjeto = await rtaFech.json();
        return rtaObjeto;
    }
    catch (error) {
        console.error(error)
    }
}

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
        });
        let respuesta = await response.json();
        console.log(respuesta);
        return respuesta.error != undefined ? respuesta : { error: "error al agregar la nueva zapatilla" };
    }
    catch (error) {
        console.error(error);
    }
}

async function agregarZapatilla(e) {
    e.preventDefault();
    let nuevoMensaje = {
        title: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
        thumbnail: document.getElementById("fotoUrl").value
    };
    let rtaAgregarZapatilla = await postData('api/zapatillas', nuevoMensaje);
    rtaAgregarZapatilla != null ? socket.emit("msgNuevoZapatilla", { status: "ok" }) : socket.emit("msgNuevoZapatilla", { status: "no ok" });
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("fotoUrl").value = "";
}

function agregarMensajeCHAT(e) {
    e.preventDefault();
    let date = new Date();
    let nuevoMensajeCHAT = {
        email: document.querySelector("input[name=email]").value,
        fecha: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        mensaje: document.querySelector("input[name=mensaje]").value
    };
    socket.emit("nuevoMensajeCHAT", nuevoMensajeCHAT);
    document.querySelector("input[name=mensaje]").value = "";
}

function renderListadoZapatillas(data) {
    console.log(data);
    let html
    if (data.length != 0) {
        html = `<table>
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>`
        html = html + data.map(function (elem, index) {
            return (`
            <tr>
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img src="${elem.thumbnail}" width=150 height=80></td>
            </tr>
            `)
        }).join(" ");
        html = html + `</table>`
    } else {
        html = "No hay zapatillas dadas de alta."
    }
    document.getElementById("listadoZapatillas").innerHTML = html;
}

const renderListadoMensajes = data => {
    console.log(data)
    let html
    if (data.length != 0) {
        html = data.map(function (elem, index) {
            return (`<div>
            <span class="chatEmail">${elem.email}</span>
            <span class="chatFecha">[${elem.fecha}]: </span>
            <span class="chatMensaje">${elem.mensaje}</span>
            </div>`)
        }).join(" ");
    }

    document.querySelector("#listadoMensajes").innerHTML = html;
};

window.addEventListener("DOMContentLoaded", async () => {
    let altaZapatilla = document.getElementById("altaZapatilla");
    altaZapatilla.addEventListener("click", agregarZapatilla);
    let nuevoMensajeCHAT = document.getElementById("nuevoMensajeCHAT");
    nuevoMensajeCHAT.addEventListener("click", agregarMensajeCHAT);
})

socket.on('msgTodosZapatillas', data => {
    console.log(data);
    renderListadoZapatillas(data);
})

socket.on('msgTodosMensajesCHAT', data => {
    console.log(data);
    renderListadoMensajes(data);
})
