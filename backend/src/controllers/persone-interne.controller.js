const service = require('../services/persone-interne.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all by sede
function findAll(req, res, next) {

    const idSede = req.params.idS;

    service.findAll(idSede, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

//GET all by divisione
function findAllByDivisione(req, res, next) {

    const idDivisione = req.params.idD;

    service.findAllByDivisione(idDivisione, (err, results) => {
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
    const personaInterna = req.body;

    service.create(idSede, personaInterna, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: 'Persona interna creata con successo',
            id: results.insertId
        });

    });

}

//PUT
function update(req, res, next) {

    const id = req.params.id;
    const idSede = req.params.idS;
    const personaInterna = req.body;

    service.update(id, idSede, personaInterna, (err, results) => {

        if (err) {
            return next(err);
        }

        //se query ritorna 'affected 0 rows in total'
        if (results.affectedRows === 0) {
            const error = new Error('Persona interna non trovata');

            error.status = 404;
            error.code = 'PERSONA_INTERNA_NOT_FOUND';

            return next(error);
        }

        res.status(204).json({
            success: true,
            message: 'Persona interna aggiornata con successo'
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
            const error = new Error('Persona interna non trovata');

            error.status = 404;
            error.code = 'PERSONA_INTERNA_NOT_FOUND';

            return next(error);
        }

        res.status(204).json({
            success: true,
            message: 'Persona interna eliminata con successo'
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

//SEARCH by divisione
function searchByDivisione(req, res, next) {

    const idDivisione = req.params.idD;
    const campo = req.query.campo;
    const valore = req.query.valore;

    service.searchByDivisione(idDivisione, campo, valore, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    }
    );
}

module.exports = { findAll, findAllByDivisione, create, update, remove, search, searchByDivisione };