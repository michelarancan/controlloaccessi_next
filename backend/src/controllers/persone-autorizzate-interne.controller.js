const service = require('../services/persone-autorizzate-interne.service');

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

    const idPersona = req.params.idP;
    //recupera json
    const personaAutorizzataInterna = req.body;

    service.create(idPersona, personaAutorizzataInterna, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Persona autorizzata interna creata con successo',
            id: results.insertId
        });

    });

}

//PUT
function update(req, res, next) {

    const id = req.params.id;
    const personaAutorizzataInterna = req.body;

    service.update(id, personaAutorizzataInterna, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Persona autorizzata interna non trovata');

            error.status = 404;
            error.code = 'PERSONA_AUTORIZZATA_INTERNA_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Persona autorizzata interna aggiornata con successo'
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
            const error = new Error('Persona autorizzata interna non trovata');

            error.status = 404;
            error.code = 'PERSONA_AUTORIZZATA_INTERNA_NOT_FOUND';

            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Persona autorizzata interna eliminata con successo'
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