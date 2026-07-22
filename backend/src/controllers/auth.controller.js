async function me(req, res, next) {
    try {

        const response = await fetch(
            'http://localhost/whoami.aspx'
        );

        console.log('STATUS', response.status);

        const text = await response.text();

        console.log(text);

        res.send(text);

    } catch (err) {
        next(err);
    }
}

module.exports = { me };