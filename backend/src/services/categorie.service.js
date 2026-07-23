const repository = require('../repositories/categorie.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

module.exports = { findAll };