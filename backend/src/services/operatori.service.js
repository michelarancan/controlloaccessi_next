const repository = require('../repositories/operatori.repository');

//qui controllo business logic (tipo campo non nullo)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(idSede, data, callback) {
    //campi non nulli
    if(!data.nome || data.nome.trim().length === 0 || !data.cognome || data.cognome.trim().length === 0) {
        const error = new Error('Nome e cognome sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    if(data.nome.length > 100) {
        const error = new Error('Il nome non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.cognome.length > 100) {
        const error = new Error('Il cognome non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    repository.create(idSede, data, callback);
}

//PUT
function update(id, data, callback) {
    //campi non nulli
    if(!data.nome || data.nome.trim().length === 0 || !data.cognome || data.cognome.trim().length === 0) {
        const error = new Error('Nome e cognome sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    if(data.nome.length > 100) {
        const error = new Error('Il nome non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.cognome.length > 100) {
        const error = new Error('Il cognome non può superare i 100 caratteri');

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