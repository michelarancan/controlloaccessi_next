const repository = require('../repositories/badge.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAllBySede(idSede, callback) {
    repository.findAllBySede(idSede, callback);
}

module.exports = { findAllBySede };