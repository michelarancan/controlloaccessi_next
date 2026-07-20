//import
require('dotenv').config({ path: '../.env'});
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const testConnection = require('./config/database');

const sediRoutes = require('./routes/sedi.routes');
//altre rotte

const app = express();
const errorHandler = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/sedi', sediRoutes);
//altri

app.use(errorHandler);

//gestisce connessione al db
testConnection();



app.listen(3000, () => {
    console.log('[Server avviato sulla porta 3000]');
});