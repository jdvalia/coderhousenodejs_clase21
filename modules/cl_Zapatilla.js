module.exports = class cl_Zapatilla {

    static #arrZapatillas = [
        {
            id: 1,
            title: "Adidas",
            price: 82500,
            thumbnail: "/images/adidas1_400.jpg",
        },
        {
            id: 2,
            title: "Nike",
            price: 98000,
            thumbnail: "/images/nike1_400.jpg",
        },
        {
            id: 3,
            title: "Topper",
            price: 873000,
            thumbnail: "/images/topper1_400.jpg",
        },
    ];

    #getMaxId() {
        return cl_Zapatilla.#arrZapatillas.length === 0 ? 0 : cl_Zapatilla.#arrZapatillas.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
    }

    getZapatillas() {
        return cl_Zapatilla.#arrZapatillas.length === 0 ? null : cl_Zapatilla.#arrZapatillas;
    }

    getZapatillaById(idZapatilla) {
        return idZapatilla != undefined && typeof (idZapatilla) === "number" ? cl_Zapatilla.#arrZapatillas.find(zapatilla => zapatilla.id === idZapatilla) : null;
    }

    setZapatilla(objZapatillaIN) {

        if (objZapatillaIN.title != undefined &&
            (objZapatillaIN.price != undefined && parseInt(objZapatillaIN.price) != NaN) &&
            (objZapatillaIN.thumbnail != undefined && objZapatillaIN.thumbnail != "")) {

            let id = this.#getMaxId();
            id++;
            objZapatillaIN.id = id;

            let objZapatillaOUT = {
                id: objZapatillaIN.id,
                title: objZapatillaIN.title,
                price: objZapatillaIN.price,
                thumbnail: objZapatillaIN.thumbnail,
            };
            cl_Zapatilla.#arrZapatillas.push(objZapatillaOUT);
            return objZapatillaOUT;
        } else {
            return null;
        }
    }

    updateZapatilla(idZapatilla, objZapatilla) {
        if (objZapatilla.title != undefined &&
            (objZapatilla.thumbnail != undefined && objZapatilla.thumbnail != "") &&
            (objZapatilla.price != undefined && parseInt(objZapatilla.price) != NaN) &&
            (idZapatilla != undefined && typeof (idZapatilla) === "number")) {

            let posicion = cl_Zapatilla.#arrZapatillas.findIndex(zapatilla => zapatilla.id === idZapatilla);

            if (posicion > -1) {
                cl_Zapatilla.#arrZapatillas.splice(posicion, 1);
                cl_Zapatilla.#arrZapatillas.push(
                    {
                        id: objZapatilla.id,
                        title: objZapatilla.title,
                        price: objZapatilla.price,
                        thumbnail: objZapatilla.thumbnail,
                    }
                );
                return true;
            }
        }
        return false;
    }

    deleteZapatilla(idZapatilla) {
        if (idZapatilla != undefined && typeof (idZapatilla) === "number") {
            let posicion = cl_Zapatilla.#arrZapatillas.findIndex(element => element.id === idZapatilla);

            if (posicion > -1) {
                cl_Zapatilla.#arrZapatillas.splice(posicion, 1);
                return true;
            }
        }
        return false;
    }
}
