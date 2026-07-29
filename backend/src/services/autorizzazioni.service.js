const repository = require('../repositories/autorizzazioni.repository');
const auditService = require('./audit.service');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(idPersona, auditInfo, data, callback) {
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

    repository.create(idPersona, auditInfo.userId, data, (err, result) => {
        if (err) {
            return callback(err);
        }
    
        if (result.affectedRows > 0) {
            auditService.log({
                utente: auditInfo.userId,
                username: auditInfo.username,
                indirizzoIp: auditInfo.ip,
                modulo: 'autorizzazioni',
                operazione: 'INSERT',
                recordId: result.insertId,
                valorePrecedente: null,
                valoreNuovo: {
                    persona: idPersona,
                    divisione: data.divisione,
                    dataInizio: data.dataInizio,
                    dataScadenza: data.dataScadenza
                }
            }, () => {});
        }

        callback(null, result);
    });
}

//PUT
function update(id, auditInfo, data, callback) {
    //campi non nulli
    if(!data.dataScadenza || data.dataScadenza.trim().length === 0) {
        const error = new Error('Data di scadenza è obbligatoria');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    repository.findById(id, (err, oldRecord) => {

        if(err) {
            return callback(err);
        }

        const dataInizio = new Date(oldRecord[0].data_inizio);
        const dataScadenza = new Date(data.dataScadenza);

        if (dataScadenza < dataInizio) {
            const error = new Error(
                'La data di scadenza non può essere precedente alla data di inizio'
            );

            error.status = 400;
            error.code = 'INVALID_DATE_RANGE';

            return callback(error);
        }

        repository.update(id, auditInfo.userId, data, (err, result) => {

            if(err) {
                return callback(err);
            }

            if (result.affectedRows > 0) {
                auditService.log({
                    utente: auditInfo.userId,
                    username: auditInfo.username,
                    indirizzoIp: auditInfo.ip,
                    modulo: 'autorizzazioni',
                    operazione: 'UPDATE',
                    recordId: id,
                    valorePrecedente: oldRecord[0],
                    valoreNuovo: {
                        id,
                        dataInizio: data.dataInizio,
                        dataScadenza: data.dataScadenza
                    }
                }, () => {});
            }

            callback(null, result);
        });
    });
}

//DELETE
function remove(id, auditInfo, callback) {
    repository.findById(id, (err, oldRecord) => {

        if(err) {
            return callback(err);
        }

        repository.remove(id, auditInfo.userId, (err, result) => {

            if(err) {
                return callback(err);
            }

            if (result.affectedRows > 0) {
                auditService.log({
                    utente: auditInfo.userId,
                    username: auditInfo.username,
                    indirizzoIp: auditInfo.ip,
                    modulo: 'autorizzazioni',
                    operazione: 'DELETE',
                    recordId: id,
                    valorePrecedente: oldRecord[0],
                    valoreNuovo: null
                }, () => {});
            }
            
            callback(null, result);
        });
    }); 
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