const knex = require("knex");
class cl_Mensaje {
    #conexionDB;
    constructor(datosConexion, table) {
        this.datosConexion = datosConexion;
        this.tabla = table;
    }

    async crearTablaMensajes() {

        try {
            this.#conexionDB = knex(this.datosConexion);
            let conex = this.#conexionDB;
            let table = this.tabla

            await conex.schema.hasTable(table).then(async function (exists) {
                if (!exists) {

                    await conex.schema.createTable(table, function (campo) {
                        campo.increments("id").primary().notNullable();
                        campo.string("email");
                        campo.string("fecha");
                        campo.string("mensaje");
                    });

                } else {

                }
            });
        }
        catch (error) {
            console.error(`${error}`);
        }
        finally {
            this.#conexionDB.destroy();
        }
    }

    async getMensajes() {

        try {
            this.#conexionDB = knex(this.datosConexion);
            return await this.#conexionDB(this.tabla);
        }
        catch (error) {
            console.error(`${error}`);
        }
        finally {
            this.#conexionDB.destroy();
        }
    };

    async insertMensaje(objMensaje) {

        try {
            this.#conexionDB = knex(this.datosConexion);
            let rtaBD = await this.#conexionDB(this.tabla).insert(objMensaje);
            return rtaBD;
        }
        catch (error) {
            console.error(`${error}`);
        }
        finally {
            this.#conexionDB.destroy();
        }
    }
}

module.exports = cl_Mensaje;