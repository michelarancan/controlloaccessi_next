const repository = require('../repositories/chiavi.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all around
function findAllAroundBySede(idSede, callback) {
    repository.findAllAroundBySede(idSede, callback);
}

module.exports = { findAllAroundBySede };