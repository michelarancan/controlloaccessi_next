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

//POST 
function create(req, res, next) {
    //recupera json
    const ingresso = req.body;

    service.create(ingresso, (err, results) => {

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

    service.update(id, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Ingresso allo stabilimento non trovato');

            error.status = 404;
            error.code = 'INGRESSO_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Ingresso allo stabilimento aggiornato con successo'
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

module.exports = { findAll, create, registerExit, search };