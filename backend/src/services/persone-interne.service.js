const repository = require('../repositories/persone-interne.repository');
const divisioniRepository = require('../repositories/divisioni.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//GET all by divisione
function findAllByDivisione(idDivisione, callback) {
    repository.findAllByDivisione(idDivisione, callback);
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

    if(!data.telefono || data.telefono.trim().length === 0 ) {
        const error = new Error('Il numero di telefono è obbligatorio');

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

    if(data.telefono.length > 30) {
        const error = new Error('Il numero di telefono non può superare i 30 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.email && data.email.length > 100) {
        const error = new Error('L\'indirizzo email non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    //verifica che la divisione appartenga alla sede
    divisioniRepository.existsInSede(data.divisione, idSede, (err, results) => {
        if(err) {
            return callback(err);
        }

        if(results.length === 0) {
            const error = new Error('La divisione non appartiene alla sede selezionata');

            error.status = 400;
            error.code = "INVALID_DIVISIONE";

            return callback(error);
        }

        repository.create(data, callback);
    });
}

//PUT
function update(id, idSede, data, callback) {
    //campi non nulli
    if(!data.nome || data.nome.trim().length === 0 || !data.cognome || data.cognome.trim().length === 0) {
        const error = new Error('Nome e cognome sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    if(!data.telefono || data.telefono.trim().length === 0 ) {
        const error = new Error('Il numero di telefono è obbligatorio');

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

    if(data.telefono.length > 30) {
        const error = new Error('Il numero di telefono non può superare i 30 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.email && data.email.length > 100) {
        const error = new Error('L\'indirizzo email non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    //verifica che la divisione appartenga alla sede
    divisioniRepository.existsInSede(data.divisione, idSede, (err, results) => {
        if(err) {
            return callback(err);
        }

        if(results.length === 0) {
            const error = new Error('La divisione non appartiene alla sede selezionata');

            error.status = 400;
            error.code = "INVALID_DIVISIONE";

            return callback(error);
        }

        repository.update(id, data, callback);
    });    
}

//DELETE
function remove(id, callback) {
    repository.remove(id, callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const campiValidi = ['nome', 'cognome', 'telefono', 'email'];

    if(!campiValidi.includes(campo)) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.search(idSede, campo, valore, callback);
}

module.exports = { findAll, findAllByDivisione, create, update, remove, search };