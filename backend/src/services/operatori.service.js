const repository = require('../repositories/operatori.repository');
const auditService = require('./audit.service');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(idSede, auditInfo, data, callback) {
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

    repository.create(idSede, data, auditInfo.userId, (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.affectedRows > 0) {
            auditService.log({
                utente: auditInfo.userId,
                username: auditInfo.username,
                indirizzoIp: auditInfo.ip,
                modulo: 'operatori',
                operazione: 'INSERT',
                recordId: result.insertId,
                valorePrecedente: null,
                valoreNuovo: {
                        id: result.insertId, 
                        nome: data.nome,
                        cognome: data.cognome,
                        sede: idSede
                    }
            }, () => {});
        }
        callback(null, result);
    });
}

//PUT
function update(id, auditInfo, data, callback) {
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
                    modulo: 'operatori',
                    operazione: 'UPDATE',
                    recordId: id,
                    valorePrecedente: oldRecord[0],
                    valoreNuovo: {
                        id, 
                        nome: data.nome,
                        cognome: data.cognome
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
                    modulo: 'operatori',
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