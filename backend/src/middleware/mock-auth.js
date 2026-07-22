function mockAuth(req, res, next) {
    req.user = {
        username: 'mario.rossi',
        permessi: ['SEDI_READ', 'SEDI_WRITE', 'OPERATORI_READ']
    };
    next();
}

module.exports = mockAuth;