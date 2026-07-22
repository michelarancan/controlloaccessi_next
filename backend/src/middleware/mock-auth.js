function mockAuth(req, res, next) {
    req.user = {
        username: 'mario.rossi',
        permessi: ['INGRESSI_READ', 'INGRESSI_WRITE']
    };
    next();
}

module.exports = mockAuth;