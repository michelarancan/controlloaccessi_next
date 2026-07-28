const connection = require('../db/connection');

//qui faccio le query al db

async function findByUsername(username) {

    //trasformo query in json
    return new Promise((resolve, reject) => {
        const query = `SELECT u.id, u.account_dominio, p.codice FROM utenti u JOIN utenti_ruoli ur ON ur.utente_id = u.id JOIN ruoli_permessi rp ON rp.ruolo_id = ur.ruolo_id JOIN permessi p ON p.id = rp.permesso_id WHERE u.account_dominio = ?`;
        connection.query(query, [username], (err, rows) => {
            if (err) {
                return reject(err);
            }

            if (!rows.length) {
                return resolve(null);
            }
            resolve({
                id: rows[0].id,
                username: rows[0].username,
                permessi: rows.map(r => r.codice)
            });
        })
    });
}

module.exports = { findByUsername };