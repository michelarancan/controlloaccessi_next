const repository = require('../repositories/persone-autorizzate-interne.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(idPersona, data, callback) {
    //campi non nulli
    if(!data.dataScadenza || data.dataScadenza.trim().length === 0) {
        const error = new Error('Data di scadenza è obbligatoria');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    repository.create(idPersona, data, callback);
}

//PUT
function update(id, data, callback) {
    //campi non nulli
    if(!data.dataScadenza || data.dataScadenza.trim().length === 0) {
        const error = new Error('Data di scadenza è obbligatoria');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    repository.update(id, data, callback);
}

//DELETE
function remove(id, callback) {
    repository.remove(id, callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const campiValidi = ['nome', 'cognome'];

    if(!campiValidi.includes(campo)) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.search(idSede, campo, valore, callback);
}

module.exports = { findAll, create, update, remove, search };