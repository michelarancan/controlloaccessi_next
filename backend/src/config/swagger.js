const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

//configurazione swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Controllo Accessi API',
            version: '1.3.0',
            description: 'Documentazione API'
        }
    },
    apis: [
        //qui vanno gli altri file routes.js di altre api
        path.join(__dirname, '../routes/sedi.routes.js'),
        path.join(__dirname, '../routes/operatori.routes.js'),
        path.join(__dirname, '../routes/persone-interne.routes.js'),
        path.join(__dirname, '../routes/divisioni.routes.js')
    ]

};

module.exports = swaggerJsdoc(options);