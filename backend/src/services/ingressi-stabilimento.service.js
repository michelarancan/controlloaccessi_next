const repository = require('../repositories/ingressi-stabilimento.repository');
const divisioneRepository = require('../repositories/divisioni.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//POST
function create(data, callback) {
    //campi non nulli
    if(!data.nome || data.nome.trim().length === 0 || !data.cognome || data.cognome.trim().length === 0) {
        const error = new Error('Nome e cognome sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    //lunghezza campi
    if(data.nome.length > 100) {
        const error = new Error('Il nome non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.cognome.length > 100) {
        const error = new Error('Il cognome non può superare i 100 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    if(data.targa && data.targa.length > 30) {
        const error = new Error('La targa non può superare i 30 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    //divisione esiste
    divisioneRepository.findSedeById(data.divisione, (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length === 0) {

            const error = new Error('Divisione non trovata');

            error.status = 400;
            error.code = 'DIVISION_NOT_FOUND';

            return callback(error);
        }

        
        if (!data.badge || !data.categoria || !data.personaRiferimento || !data.azienda || !data.divisione) {
            const error = new Error('Badge, categoria, persona di riferimento, azienda e divisione sono obbligatori');

            error.status = 400;
            error.code = 'INVALID_PARAMS_FIELD';

            return callback(error);
        }


        //badge non ce l'ha qualcuno ancora dentro
        repository.badgeAlreadyTaken(data.badge, (err, badgeTakenResults) => {
            if (err) {
                return callback(err);
            }

            if (badgeTakenResults.length !== 0) {

                const error = new Error(
                    'Il badge è già in utilizzo al momento'
                );

                error.status = 400;
                error.code = 'BADGE_ALREADY_TAKEN';

                return callback(error);
            }

            repository.create(data, callback);
        });
    });
}

//PUT
function registerExit(id, callback) {

    repository.registerExit(id, (err, results) => {

        if (err) {
            return callback(err);
        }

        if (results.affectedRows === 0) {

            const error = new Error('L\'accesso risulta già chiuso oppure non esiste');

            error.status = 400;
            error.code = 'ACCESS_ALREADY_CLOSED';

            return callback(error);
        }

        callback(null, results);
    });
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const campiValidi = {    
        nome: 'i.nome',
        cognome: 'i.cognome',
        badge: 'b.codice',
        targa: 'i.targa',
        categoria: 'c.codice',
        azienda: 'a.ragione_sociale',
        divisione: 'd.nome',

        personaRiferimento: "CONCAT(p.cognome, ' ', p.nome)"
    };

    const campoSql = campiValidi[campo];

    if(!campoSql) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.search(idSede, campoSql, valore, callback);
}

module.exports = { findAll, create, registerExit, search };