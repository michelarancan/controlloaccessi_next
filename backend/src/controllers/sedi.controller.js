const service = require('../services/sedi.service');

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

//GET by id
function findById(req, res, next) {

    const id = req.params.id;

    service.findById(id, (err, results) => {

        if (err) {
            return next(err);
        }

        //se non ritorna nulla
        if (results.length === 0) {
            const error = new Error('Sede non trovata');

            error.status = 404;
            error.code = 'SEDE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json(results[0]);

    });

}

//POST 
function create(req, res, next) {

    //recupera json
    const sede = req.body;

    service.create(sede, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Sede creata con successo',
            id: results.insertId
        });

    });

}

//PUT
function update(req, res, next) {

    const id = req.params.id;
    const sede = req.body;

    service.update(id, sede, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Sede non trovata');

            error.status = 404;
            error.code = 'SEDE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Sede aggiornata con successo'
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
            const error = new Error('Sede non trovata');

            error.status = 404;
            error.code = 'SEDE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Sede eliminata con successo'
        });

    });

}

module.exports = { findAll, findById, create, update, remove };