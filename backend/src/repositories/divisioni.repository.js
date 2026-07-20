const connection = require('../db/connection');

//qui faccio le query al db

//GET by id
function existsInSede(idDivisione, idSede, callback) {
    const query = `SELECT id FROM divisioni WHERE id = ? AND sede = ? AND is_active = true`;
    connection.query(query, [idDivisione, idSede], callback);
}

module.exports = { existsInSede };