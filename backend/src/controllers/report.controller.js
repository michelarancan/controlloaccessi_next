const service = require('../services/report.service');

//qui gestisco requests HTTP e mando response HTTP

//GET all by data
function findAllByData(req, res, next) {

    const idSede = req.params.idS;
    
    const periodo = {
        data: req.query.data
    };
    service.findAllByData(idSede, periodo, (err, results) => {
        if(err) {
            return next(err);
        }

        res.status(200).json(results);
    });
}

//GET pdf
function generatePdf(req, res, next) {

    const idSede = req.params.idS;
    const data = req.query.data;
    
    service.generatePdf(idSede, data, async (err, pdfBuffer) => {
        if(err) {
            return next(err);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=report-${data}.pdf`);

        res.send(pdfBuffer);
    });
}

module.exports = { findAllByData, generatePdf };