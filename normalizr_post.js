const normaliz = require("normalizr");
const normalize = normaliz.normalize;
const denormalize = normaliz.denormalize;
const schema = normaliz.schema;

const originalData = {
    id: "111",
    posts: [
        {
            id: "321",
            author: {
                id: "1",
                nombre: "luis",
                apellido: "rodriguez"
            },
            titulo: "Titulo 1",
            comments: [
                {
                    id: "987",
                    commenter: {
                        id: "2",
                        nombre: "juan",
                        apellido: "rodriguez"
                    }
                }, {
                    id: "325",
                    commenter: {
                        id: "3",
                        nombre: "vera",
                        apellido: "rodriguez"
                    }
                }]
        }, {
            id: "1321",
            author: {
                id: "2",
                nombre: "juan",
                apellido: "rodriguez"
            },
            titulo: "Titulo 2",
            comments: [
                {
                    id: "1987",
                    commenter: {
                        id: "1",
                        nombre: "luis",
                        apellido: "rodriguez"
                    }
                }, {
                    id: "1325",
                    commenter: {
                        id: "3",
                        nombre: "vera",
                        apellido: "rodriguez"
                    }
                }]
        }, {
            id: "2321",
            author: {
                id: "3",
                nombre: "vera",
                apellido: "rodriguez"
            },
            titulo: "Titulo 3",
            comments: [
                {
                    id: "2987",
                    commenter: {
                        id: "2",
                        nombre: "juan",
                        apellido: "rodriguez"
                    }
                }, {
                    id: "2325",
                    commenter: {
                        id: "1",
                        nombre: "luis",
                        apellido: "rodriguez"
                    }
                }]
        },
    ],
}

const user = new schema.Entity("users");
const comment = new schema.Entity("comments", { commenter: user });

const article = new schema.Entity("articles", {
    author: user,
    comments: [comment]
})

const posts = new schema.Entity("post", { post: [article] })

const util = require("util")

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

console.log("objeto original")
console.log(JSON.stringify(originalData).length)

console.log("objeto normalizado")
const normalizeData = normalize(originalData, posts)

console.log(JSON.stringify(normalizeData).length)

console.log("objeto desnormalizado")
const denormalizeData = denormalize(normalizeData.result, posts, normalizeData.entities)
console.log(JSON.stringify(denormalizeData).length)
