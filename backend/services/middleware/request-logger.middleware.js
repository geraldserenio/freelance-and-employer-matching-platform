const requestLogger = (req, res, next) => {
    const requestHost = req.get('host'); // Gets the Host header
    const requestTime = new Date().toISOString(); // Current timestamp
    const requestMethod = req.method; // GET, POST, PUT, DELETE, etc.
    const requestUrl = req.originalUrl; // API endpoint being accessed

    console.log(`[${requestTime}] ${requestHost} ${requestMethod}${requestUrl}`);

    next();
};

module.exports = requestLogger;
