const service = require('../services/operatori.service');

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

//GET by id
function findById(req, res, next) {

    const id = req.params.id;

    service.findById(id, (err, results) => {

        if (err) {
            return next(err);
        }

        //se non ritorna nulla
        if (results.length === 0) {
            const error = new Error('Operatore non trovato');

            error.status = 404;
            error.code = 'OPERATORE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json(results[0]);

    });

}

//POST 
function create(req, res, next) {

    const idSede = req.params.idS;
    //recupera json
    const operatore = req.body;

    service.create(idSede, operatore, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Operatore creato con successo',
            id: results.insertId
        });

    });

}

//PUT
function update(req, res, next) {

    const id = req.params.id;
    const operatore = req.body;

    service.update(id, operatore, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Operatore non trovato');

            error.status = 404;
            error.code = 'OPERATORE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Operatore aggiornato con successo'
        });

    });

}

//DELETE
function remove(req, res, next) {

    const id = req.params.id;

    service.remove(id, (err, result) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (result.affectedRows === 0) {
            const error = new Error('Operatore non trovato');

            error.status = 404;
            error.code = 'OPERATORE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Operatore eliminato con successo'
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

module.exports = { findAll, findById, create, update, remove, search };