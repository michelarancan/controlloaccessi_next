const repository = require('../repositories/sedi.repository');
const auditService = require('./audit.service');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

//POST
function create(data, auditInfo, callback) {
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

    repository.create(data, auditInfo.userId, (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.affectedRows > 0) {
            auditService.log({
                utente: auditInfo.userId,
                username: auditInfo.username,
                indirizzoIp: auditInfo.ip,
                modulo: 'sedi',
                operazione: 'INSERT',
                recordId: result.insertId,
                valorePrecedente: null,
                valoreNuovo: {
                    id: result.insertId,
                    sede: data.sede,
                    ufficio: data.ufficio
                }
            }, () => {});
        }
        callback(null, result);
    });
}

//PUT
function update(id, auditInfo, data, callback) {
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

    repository.findById(id, (err, oldRecord) => {

        if(err) {
            return callback(err);
        }

        repository.update(id, data, auditInfo.userId, (err, result) => {

            if(err) {
                return callback(err);
            }
            if (result.affectedRows > 0) {
                auditService.log({
                    utente: auditInfo.userId,
                    username: auditInfo.username,
                    indirizzoIp: auditInfo.ip,
                    modulo: 'sedi',
                    operazione: 'UPDATE',
                    recordId: id,
                    valorePrecedente: oldRecord[0],
                    valoreNuovo: {
                        id,
                        sede: data.sede,
                        ufficio: data.ufficio
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
                    modulo: 'sedi',
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

module.exports = { findAll, create, update, remove, search };