const loggerUrl = (request, response, next) => {
    console.log(process.env.API_URL + request.url);
    next();
};

module.exports = loggerUrl;
