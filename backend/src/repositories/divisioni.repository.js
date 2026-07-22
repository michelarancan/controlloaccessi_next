const connection = require('../db/connection');

//qui faccio le query al db

//divisione in una certa sede?
function existsInSede(idDivisione, idSede, callback) {
    const query = `SELECT id FROM divisioni WHERE id = ? AND sede = ? AND is_active = true`;
    connection.query(query, [idDivisione, idSede], callback);
}

//GET all by sede
function findAll(idSede, callback) {
    const query = `SELECT id, nome FROM divisioni WHERE sede = ? AND is_active = true`;
    connection.query(query, [idSede], callback);
}

//GET sede by id
function findSedeById(id, callback) {
    const query = `SELECT sede FROM divisioni WHERE id = ? AND is_active = true`;
    connection.query(query, [id], callback);
}

module.exports = { existsInSede, findAll, findSedeById };