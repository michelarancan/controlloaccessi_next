const service = require('../services/divisioni.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all
function findAll(req, res, next) {

    const idSede = req.params.idS;

    service.findAll(idSede, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

module.exports = { findAll };