const service = require('../services/ingressi-stabilimento.service');

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

//GET all by data
function findAllByData(req, res, next) {

    const idSede = req.params.idS;
    
    const periodo = {
        inizioPeriodo: req.query.inizioPeriodo,
        finePeriodo: req.query.finePeriodo
    };


    service.findAllByData(idSede, periodo, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

//POST 
function create(req, res, next) {

    const idSede = req.params.idS;
    //recupera json
    const ingresso = req.body;

    service.create(idSede, ingresso, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Ingresso allo stabilimento aggiunto con successo',
            id: results.insertId
        });

    });

}

//PUT
function registerExit(req, res, next) {

    const id = req.params.id;

    service.registerExit(id, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: 'Uscita registrata con successo'
        });

    });

}

//SEARCH
function search(req, res, next) {

    const idSede = req.params.idS;
    const campo = req.query.campo;
    const valore = req.query.valore;

    service.search(idSede, campo, valore, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    }
    );
}

//SEARCH by data
function searchByData(req, res, next) {

    const idSede = req.params.idS;
    
    const periodo = {
        inizioPeriodo: req.query.inizioPeriodo,
        finePeriodo: req.query.finePeriodo
    };

    const campo = req.query.campo;
    const valore = req.query.valore;

    service.searchByData(idSede, periodo, campo, valore, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    }
    );
}

module.exports = { findAll, findAllByData, create, registerExit, search, searchByData };