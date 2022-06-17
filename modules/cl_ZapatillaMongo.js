const { MongoClient, ObjectId } = require('mongodb');
const { faker } = require("@faker-js/faker");

const mongo_url = 'mongodb+srv://equipo9:Lj30sffXYx13Zy4V@cluster0.tferq.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
client.connect();

class cl_Zapatilla {
    constructor() {
        this.collection = client.db("coderhouse").collection("zapatillas")
    }

    async getZapatillas() {
        try {
            const array = await this.collection.find().toArray()
            return array
        }
        catch (error) {
            console.error(`${error}`);
        }
    }

    async addZapatillasAleatorios() {

        try {
            let nombre
            let precio
            let foto
            let zapatilla

            for (let i = 0; i < 5; i++) {
                nombre = faker.name.firstName();
                precio = faker.finance.amount();
                foto = faker.image.avatar();
                zapatilla = {
                    id: i,
                    title: nombre,
                    price: precio,
                    thumbnail: foto,
                }

                await this.collection.insertOne(zapatilla);
            }
        }
        catch (error) {
            console.error(`${error}`);
        }
    }
}

module.exports = cl_Zapatilla;