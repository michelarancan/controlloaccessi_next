//import
require('dotenv').config({ path: '../.env'});
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const testConnection = require('./config/database');

const mockAuth = require('./middleware/mock-auth');

//const authRoutes = require('./routes/auth.routes');
const sediRoutes = require('./routes/sedi.routes');
const operatoriRoutes = require('./routes/operatori.routes');
const personeRoutes = require('./routes/persone.routes');
const divisioniRoutes = require('./routes/divisioni.routes');
const personeAutorizzateInterneRoutes = require('./routes/persone-autorizzate-interne.routes');
const ingressiStabilimentoRoutes = require('./routes/ingressi-stabilimento.routes');
const badgeRoutes = require('./routes/badge.routes');
const categorieRoutes = require('./routes/categorie.routes');
const aziendeRoutes = require('./routes/aziende.routes');
//altre rotte

const app = express();
const errorHandler = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(mockAuth);

//app.use('/api/auth', authRoutes);
app.use('/api/sedi', sediRoutes);
app.use('/api/operatori', operatoriRoutes);
app.use('/api/persone', personeRoutes);
app.use('/api/divisioni', divisioniRoutes);
app.use('/api/persone-autorizzate-interne', personeAutorizzateInterneRoutes);
app.use('/api/ingressi-stabilimento', ingressiStabilimentoRoutes);
app.use('/api/badge', badgeRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/aziende', aziendeRoutes);
//altri

app.use(errorHandler);

//gestisce connessione al db
testConnection();



app.listen(3000, () => {
    console.log('[Server avviato sulla porta 3000]');
});