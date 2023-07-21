const logsRequest = (req, res, next) => {
    console.log('Terjadi request di API : ', req.path);
    next();
}

module.exports = logsRequest;