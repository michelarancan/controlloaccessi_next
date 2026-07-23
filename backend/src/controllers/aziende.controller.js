const service = require('../services/aziende.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all
function findAll(req, res, next) {

    service.findAll((err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

module.exports = { findAll };