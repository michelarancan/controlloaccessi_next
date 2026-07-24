const service = require('../services/autorizzazioni.service');

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

    const idSede = req.params.idS;
    const idPersona = req.params.idP;
    //recupera json
    const autorizzazione = req.body;

    service.create(idPersona, idSede, autorizzazione, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Autorizzazione creata con successo',
            id: results.insertId
        });

    });

}

//PUT
function update(req, res, next) {

    const id = req.params.id;
    const autorizzazione = req.body;

    service.update(id, autorizzazione, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Autorizzazione non trovata');

            error.status = 404;
            error.code = 'AUTORIZZAZIONE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Autorizzazione aggiornata con successo'
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
            const error = new Error('Autorizzazione non trovata');

            error.status = 404;
            error.code = 'AUTORIZZAZIONE_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Autorizzazione eliminata con successo'
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

module.exports = { findAll, create, update, remove, search };