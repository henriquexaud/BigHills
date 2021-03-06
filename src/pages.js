
const Database = require('./database/db');
const saveHill = require('./database/saveHill')

module.exports = {

    index(req, res) {
        const city = req.query.city
        return res.render('index', { city })
    },

    async hills(req, res) {
        try {
            const db = await Database;
            const hills = await db.all("SELECT * FROM hills")
            return res.render('hills', { hills })
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
    },

    async hill(req, res) {

        const id = req.query.id

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM hills WHERE id = "${id}"`)
            const hill = results[0]

            hill.images = hill.images.split(",")
            hill.firstImage = hill.images[0]

            return res.render('hill', { hill })

        } catch (erro) {
            console.log(erro);
            return res.send('Erro 2 no banco de dados')
        }
    },

    createHill(req, res) {
        return res.render('create-hill')
    },

    async saveHill(req, res) {
        const fields = req.body
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos')
        }

        try {
            // save hill
            const db = await Database
            await saveHill(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                images: fields.images,
                description: fields.description,
                advises: fields.advises,
            })
            //redirect
            return res.redirect("/hills")
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }


    }

}