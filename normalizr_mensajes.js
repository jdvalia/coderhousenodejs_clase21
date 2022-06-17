const { normalize, denormalize, schema } = require('normalizr')

const chat = {
    id: 1,
    autor: [
        {
            id: 1,
            email: "jorgevalia@gmail.com",
            nombre: "Jorge",
            apellido: "Valia"
        }, {
            id: 2,
            email: "pedrosaenz@gmail.com",
            nombre: "Pedro",
            apellido: "Saenz"
        }, {
            id: 3,
            email: "carloscape@yahoo.com.ar",
            nombre: "Carlos",
            apellido: "Cape"
        }
    ],
    mensajes: [
        {
            id: 1000,
            email: "jorgevalia@gmail.com",
            fecha: '2/6/2022 09:17:04',
            mensaje: "Hola, como va?"
        }, {
            id: 1001,
            email: "pedrosaenz@gmail.com",
            fecha: '2/6/2022 09:17:08',
            mensaje: "Bieeeen!!!. Y vos?"
        }, {
            id: 1002,
            email: 'jorgevalia@gmail.com',
            fecha: '2/6/2022 091:17:14',
            mensaje: "Bien che"
        }, {
            id: 1003,
            email: 'jorgevalia@gmail.com',
            fecha: '2/6/2022 09:17:15',
            mensaje: "El martes no puedo ir"
        }, {
            id: 1004,
            email: 'carloscape@yahoo.com.ar',
            fecha: '2/6/2022 09:18:04',
            mensaje: "yo puedo"
        }, {
            id: 1005,
            email: "jorgevalia@gmail.com",
            fecha: '2/6/2022 09:18:06',
            mensaje: "Buenisimo"
        }, {
            id: 1006,
            email: "pedrosaenz@gmail.com",
            fecha: '2/6/2022 09:18:18',
            mensaje: "yo tambien"
        }, {
            id: 1007,
            email: 'jorgevalia@gmail.com',
            fecha: '2/6/2022 09:18:19',
            mensaje: "Que lo disfruten"
        }
    ]
}

const autorSchema = new schema.Entity('autor')
const mensajeSchema = new schema.Entity('mensajes')
const chatSchema = new schema.Entity('chat', {
    autor: [autorSchema],
    mensajes: [mensajeSchema]
})

const normalizeObj = normalize(chat, chatSchema);
const util = require('util')
function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

console.log("estructra del objeto")
print(normalizeObj);

console.log("cant original")
console.log(JSON.stringify(chat).length);
console.log("cant normalizado")
console.log(JSON.stringify(normalizeObj).length);
console.log("cant desnormalizado")
const denormalizeObj = denormalize(normalizeObj.result, chatSchema, normalizeObj.entities);
console.log(JSON.stringify(denormalizeObj).length);
console.log("compresion")
console.log((JSON.stringify(normalizeObj).length * 100) / JSON.stringify(chat).length);