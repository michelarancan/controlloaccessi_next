function errorHandler(err, req, res, next) {
    const status = err.status || 500;

    //formato standard dell'errore
    res.status(status).json({
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Errore interno del server'
        }
    });
}

module.exports = errorHandler;