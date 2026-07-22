const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT a.id, p.id AS idPersona, p.nome, p.cognome, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza FROM persone_interne p JOIN ingressi_autorizzati_interni a ON p.id  = a.persona JOIN divisioni d ON p.divisione = d.id WHERE d.sede = ? AND a.is_active = true ORDER BY p.cognome, p.nome`;
    connection.query(query, [idSede], callback);
}

//POST
function create(idPersona, data, callback) {
    const query = `INSERT INTO ingressi_autorizzati_interni(persona, data_scadenza) VALUES (?, ?)`;
    connection.query(query, [idPersona, data.dataScadenza], callback);
}

//PUT
function update(id, data, callback) {
    const query = `UPDATE ingressi_autorizzati_interni SET data_scadenza = ? WHERE id = ?`;
    connection.query(query, [data.dataScadenza, id], callback);
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE ingressi_autorizzati_interni SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT a.id, p.id AS idPersona, p.nome, p.cognome, DATE_FORMAT(a.data_scadenza, '%Y-%m-%d') AS dataScadenza FROM persone_interne p JOIN ingressi_autorizzati_interni a ON p.id  = a.persona JOIN divisioni d ON p.divisione = d.id WHERE d.sede = ? AND p.${campo} LIKE ? AND a.is_active = true ORDER BY p.cognome, p.nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };