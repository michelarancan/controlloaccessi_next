const service = require('../services/badge.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all
function findAllBySede(req, res, next) {

    const idSede = req.params.idS;

    service.findAllBySede(idSede, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

module.exports = { findAllBySede };