const repository = require('../repositories/persone.repository');
const divisioniRepository = require('../repositories/divisioni.repository');
const auditService = require('./audit.service');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

//GET all interne
function findAllInterne(idSede, callback) {
    repository.findAllInterne(idSede, callback);
}

//GET all interne by divisione
function findAllInterneByDivisione(idDivisione, callback) {
    repository.findAllInterneByDivisione(idDivisione, callback);
}

//POST
function createInterna(idSede, auditInfo, data, callback) {
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

        repository.createInterna(data, auditInfo.userId, (err, result) => {
            if (err) {
                return callback(err);
            }
            if (result.affectedRows > 0) {
                auditService.log({
                    utente: auditInfo.userId,
                    username: auditInfo.username,
                    indirizzoIp: auditInfo.ip,
                    modulo: 'persone_interne',
                    operazione: 'INSERT',
                    recordId: result.insertId,
                    valorePrecedente: null,
                    valoreNuovo: {
                        id: result.insertId,
                        nome: data.nome,
                        cognome: data.cognome,
                        telefono: data.telefono,
                        email: data.email,
                        divisione: data.divisione
                    }
                }, () => {});
            }
            callback(null, result);
        });
    });
}

//PUT
function updateInterna(id, idSede, auditInfo, data, callback) {
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

        repository.findById(id, (err, oldRecord) => {

            if(err) {
                return callback(err);
            }

            repository.updateInterna(id, data, auditInfo.userId, (err, result) => {

                if(err) {
                    return callback(err);
                }
                if (result.affectedRows > 0) {
                    auditService.log({
                        utente: auditInfo.userId,
                        username: auditInfo.username,
                        indirizzoIp: auditInfo.ip,
                        modulo: 'persone_interne',
                        operazione: 'UPDATE',
                        recordId: id,
                        valorePrecedente: oldRecord[0],
                        valoreNuovo: {
                            id,
                            nome: data.nome,
                            cognome: data.cognome,
                            telefono: data.telefono,
                            email: data.email,
                            divisione: data.divisione
                        }
                    }, () => {});
                }
                callback(null, result);
            });
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
                    modulo: 'persone_interne',
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
function searchInterna(idSede, campo, valore, callback) {
    
    const campiValidi = {
        nome: 'per.nome',
        cognome: 'per.cognome',
        telefono: 'per.telefono',
        email: 'per.email'
    };

    const campoSql = campiValidi[campo];    

    if(!campoSql) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.searchInterna(idSede, campoSql, valore, callback);
}

//SEARCH by divisione
function searchInternaByDivisione(idDivisione, campo, valore, callback) {
    const campiValidi = {
        nome: 'per.nome',
        cognome: 'per.cognome',
        telefono: 'per.telefono',
        email: 'per.email'
    };

    const campoSql = campiValidi[campo];    

    if(!campoSql) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.searchInternaByDivisione(idDivisione, campoSql, valore, callback);
}

module.exports = { findAll, findAllInterne, findAllInterneByDivisione, createInterna, updateInterna, remove, searchInterna, searchInternaByDivisione };