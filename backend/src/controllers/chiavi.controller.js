const service = require('../services/chiavi.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all around
function findAllAroundBySede(req, res, next) {

    const idSede = req.params.idS;

    service.findAllAroundBySede(idSede, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

module.exports = { findAllAroundBySede };