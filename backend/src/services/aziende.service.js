const repository = require('../repositories/aziende.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

module.exports = { findAll };