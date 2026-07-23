const connection = require('../db/connection');

//qui faccio le query al db

//GET all interne di una sede
function findAllInterne(idSede, callback) {
    const query = `SELECT per.id, per.nome, per.cognome, per.telefono, per.email, p.divisione, d.nome AS nomeDivisione FROM persone_interne p JOIN persone per ON p.persona = per.id JOIN divisioni d ON p.divisione = d.id WHERE per.is_active = true AND d.sede = ? ORDER BY per.cognome, per.nome`;
    connection.query(query, [idSede], callback);
}

//GET all interne di una divisione
function findAllInterneByDivisione(idDivisione, callback) {
    const query = `SELECT per.id, per.nome, per.cognome, per.telefono, per.email, p.divisione, d.nome AS nomeDivisione FROM persone_interne p JOIN persone per ON p.persona = per.id JOIN divisioni d ON p.divisione = d.id WHERE per.is_active = true AND p.divisione = ? ORDER BY per.cognome, per.nome`;
    connection.query(query, [idDivisione], callback);
}

//GET by id interna
function findInternaById(id, callback) {
    const query = `SELECT per.id, per.nome, per.cognome, per.telefono, per.email, p.divisione FROM persone_interne p JOIN persone per ON per.id = p.persona WHERE per.id = ? AND per.is_active = true`;
    connection.query(query, [id], callback);
}

//POST
function createInterna(data, callback) {
    const query1 = `INSERT INTO persone(nome, cognome, telefono , email) VALUES (?, ?, ?, ?)`;
    connection.query(query1, [data.nome, data.cognome, data.telefono, data.email],
        (err, results) => {
            if(err) {
                return callback(err);
            }

            const personaId = results.insertId;

            const query2 = `INSERT INTO persone_interne(persona, divisione) VALUES (?, ?)`;
            connection.query(query2, [personaId, data.divisione], (err) => {
                if (err) {
                    return callback(err);
                }

                callback(null, {
                    insertId: personaId
                });
            });
        }
    );
}

//PUT
function updateInterna(id, data, callback) {
    const query1 = `UPDATE persone SET nome = ?, cognome = ?, telefono = ?, email = ? WHERE id = ?`;
    connection.query(query1,[data.nome, data.cognome, data.telefono, data.email, id], (err) => {
        if (err) {
            return callback(err);
        }

        const query2 = `UPDATE persone_interne SET divisione = ? WHERE persona = ?`;
        connection.query(query2, [data.divisione, id], callback);
    });
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE persone SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function searchInterna(idSede, campo, valore, callback) {
    const query = `SELECT per.id, per.nome, per.cognome, per.telefono, per.email, p.divisione, d.nome AS nomeDivisione FROM persone_interne p JOIN persone per ON p.persona = per.id JOIN divisioni d ON p.divisione = d.id WHERE d.sede = ? AND ${campo} LIKE ? AND per.is_active = true ORDER BY per.cognome, per.nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

//SEARCH by divisione
function searchInternaByDivisione(idDivisione, campo, valore, callback) {
    const query = `SELECT per.id, per.nome, per.cognome, per.telefono, per.email, p.divisione, d.nome AS nomeDivisione FROM persone_interne p JOIN persone per ON p.persona = per.id JOIN divisioni d ON p.divisione = d.id WHERE p.divisione = ? AND ${campo} LIKE ? AND per.is_active = true ORDER BY per.cognome, per.nome`;
    connection.query(query, [idDivisione, `%${valore}%`], callback);
}

module.exports = { findAllInterne, findAllInterneByDivisione, findInternaById, createInterna, updateInterna, remove, searchInterna, searchInternaByDivisione };