const repository = require('../repositories/report.repository');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all by data
function findAllByData(idSede, data, callback) {
    repository.findAllByData(idSede, data, callback);
}

//GET pdf
async function generatePdf(idSede, data, callback) {
    repository.findAllByData(idSede, {data}, async (err, results) => {
        if(err) {
            return callback(err);
        }

        try {

            const interni = results.filter(r => !r.azienda);
            const esterni = results.filter(r => !!r.azienda);

            const righeInterni = interni.map(r => `<tr><td>${r.nome}</td><td>${r.cognome}</td><td>${r.divisione}</td><td>${r.oraIngresso}</td><td>${r.oraUscita}</td></tr>`).join('');

            const righeEsterni = esterni.map(r => `<tr><td>${r.nome}</td><td>${r.cognome}</td><td>${r.azienda}</td><td>${r.oraIngresso}</td><td>${r.oraUscita}</td></tr>`).join('');

            const logoBase64 = fs.readFileSync(path.resolve(__dirname, '../../../frontend/src/app/assets/logo-marzotto-black.png')).toString('base64');

            const logoTag = `<img src="data:image/png;base64,${logoBase64}">`;

            let html = fs.readFileSync(path.join(__dirname, '../../../frontend/src/app/templates/accessi-giornalieri.html'), 'utf8');

            const css = fs.readFileSync(path.join(__dirname, '../../../frontend/src/styles.css'), 'utf8');

            html = html.replace('{{ styles }}', `<style>${css}</style>`).replace('{{ data }}', data).replace('{{ logo }}', logoTag).replace('{{ righe_interni }}', righeInterni).replace('{{ righe_esterni }}', righeEsterni);

            const browser = await puppeteer.launch({headless: 'new', userDataDir: './tmp/puppeteer'});

            const page = await browser.newPage();
            await page.setContent(html, {waitUntil: 'networkidle0'});

            const pdf = await page.pdf({format: 'A4', printBackground: true});

            await browser.close();
            callback(null, pdf);
        }
        catch (error) {
            callback(error);
        }
    });
}

module.exports= { findAllByData, generatePdf };