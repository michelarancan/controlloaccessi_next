const connection = require('../db/connection');

async function testConnection() {
  try {
    //connessione
    connection.connect((err) => {
    if (err) {
      console.error('Errore di connessione a MySQL:', err);
      return;
    }
    console.log('[Connessione a MySQL riuscita]');
});
  } catch (error) {
    console.error('[Errore connessione MySQL]');
    console.error(error.message);
  }
}

module.exports = testConnection;