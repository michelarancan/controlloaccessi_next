const repository = require('../repositories/sedi.repository');

//qui controllo business logic (tipo campo non nullo)

//GET all
function findAll(callback) {
    repository.findAll(callback);
}

//GET by id
function findById(id, callback) {
    repository.findById(id, callback);
}

//POST
function create(data, callback) {
    //cmapi non nulli
    if(!data.sede || !data.ufficio) {
        return callback(
            new Error('Sede e ufficio sono obbligatori')
        );
    }

    repository.create(data, callback);
}

//PUT
function update(id, data, callback) {
    //campi non nulli
    if(!data.sede || !data.ufficio) {
        return callback(
            new Error('Sede e ufficio sono obbligatori')
        );
    }

    repository.update(id, data, callback);
}

//DELETE
function remove(id, callback) {
    repository.remove(id, callback);
}

module.exports = { findAll, findById, create, update, remove };