const repository = require('../repositories/badge.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAllBySede(idSede, callback) {
    repository.findAllBySede(idSede, callback);
}

//GET all around
function findAllAroundBySede(idSede, callback) {
    repository.findAllAroundBySede(idSede, callback);
}

module.exports = { findAllBySede, findAllAroundBySede };