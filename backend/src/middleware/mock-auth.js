function mockAuth(req, res, next) {
    req.user = {
        username: 'mario.rossi',
        permessi: ['INGRESSI_READ', 'INGRESSI_WRITE', 'DIVISIONI_READ', 'SEDI_READ', 'BADGE_READ', 'CATEGORIE_READ', 'PERSONE_INTERNE_READ', 'PERSONE_INTERNE_WRITE', 'AZIENDE_READ', 'PERSONE_AUTORIZZATE_INTERNE_READ', 'PERSONE_AUTORIZZATE_INTERNE_WRITE', 'PERSONE_WRITE']
    };
    next();
}

module.exports = mockAuth;