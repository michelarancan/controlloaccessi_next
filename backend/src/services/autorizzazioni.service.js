const repository = require('../repositories/autorizzazioni.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(idPersona, idSede, data, callback) {
    //campi non nulli
    if(!data.dataScadenza || data.dataScadenza.trim().length === 0 || !data.dataInizio || data.dataInizio.trim().length === 0) {
        const error = new Error('Data di inizio e scadenza obbligatorie');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }
    
    const dataInizio = new Date(data.dataInizio);
    const dataScadenza = new Date(data.dataScadenza);

    if (dataScadenza < dataInizio) {
        const error = new Error(
            'La data di scadenza non può essere precedente alla data di inizio'
        );

        error.status = 400;
        error.code = 'INVALID_DATE_RANGE';

        return callback(error);
    }

    repository.create(idPersona, idSede, data, callback);
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

    const dataInizio = new Date(data.dataInizio);
    const dataScadenza = new Date(data.dataScadenza);

    if (dataScadenza < dataInizio) {
        const error = new Error(
            'La data di scadenza non può essere precedente alla data di inizio'
        );

        error.status = 400;
        error.code = 'INVALID_DATE_RANGE';

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