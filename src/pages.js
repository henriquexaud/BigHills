module.exports = {

    index(req, res) {
        const city = req.query.city
        return res.render('index', { city })
    },

    hills(req, res) {
        return res.render('hills')
    },

    hill(req, res) {
        return res.render('hill')
    },

    createHill(req, res) {
        return res.render('create-hill')
    }

}