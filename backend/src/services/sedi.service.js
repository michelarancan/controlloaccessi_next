const repository = require('../repositories/sedi.repository');

//qui controllo business logic (tipo campo non nullo)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

//GET by id
function findById(id, callback) {
    repository.findById(id, callback);
}

//POST
function create(data, callback) {
    //campi non nulli
    if(!data.sede || data.sede.trim().length === 0 || !data.ufficio || data.ufficio.trim().length === 0) {
        const error = new Error('Sede e ufficio sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    if(data.sede.length > 100) {
        const error = new Error('La sede non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.ufficio.length > 100) {
        const error = new Error('L\'ufficio non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    repository.create(data, callback);
}

//PUT
function update(id, data, callback) {
    //campi non nulli
    if(!data.sede || data.sede.trim().length === 0 || !data.ufficio || data.ufficio.trim().length === 0) {
        const error = new Error('Sede e ufficio sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    if(data.sede.length > 100) {
        const error = new Error('La sede non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.ufficio.length > 100) {
        const error = new Error('L\'ufficio non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    repository.update(id, data, callback);
}

//DELETE
function remove(id, callback) {
    repository.remove(id, callback);
}

//SEARCH
function search(campo, valore, callback) {
    const campiValidi = ['sede', 'ufficio'];

    if(!campiValidi.includes(campo)) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.search(campo, valore, callback);
}

module.exports = { findAll, findById, create, update, remove, search };