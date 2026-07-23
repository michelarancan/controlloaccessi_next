const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

//configurazione swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Controllo Accessi API',
            version: '2.0.0',
            description: 'Documentazione API'
        }
    },
    apis: [
        //qui vanno gli altri file routes.js di altre api
        path.join(__dirname, '../routes/sedi.routes.js'),
        path.join(__dirname, '../routes/operatori.routes.js'),
        path.join(__dirname, '../routes/persone.routes.js'),
        path.join(__dirname, '../routes/divisioni.routes.js'),
        path.join(__dirname, '../routes/persone-autorizzate-interne.routes.js'),
        path.join(__dirname, '../routes/ingressi-stabilimento.routes.js'),
        path.join(__dirname, '../routes/badge.routes.js'),
        path.join(__dirname, '../routes/categorie.routes.js'),
        path.join(__dirname, '../routes/aziende.routes.js')
    ]

};

module.exports = swaggerJsdoc(options);