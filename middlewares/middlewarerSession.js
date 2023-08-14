function sessionClient(req, res, next) {
    if (req.session.clienteId) {
        res.locals.session = req.session
    }
    next();
};

module.exports = sessionClient;