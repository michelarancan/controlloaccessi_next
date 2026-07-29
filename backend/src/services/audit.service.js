const repository = require('../repositories/audit.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

function log(data, callback) {
    repository.create(data, (err, result) => {
        if (err) {
            console.error('Errore audit:', err);
        }

        if(callback) {
            callback(err, result);
        }
    });
}

module.exports = { log };