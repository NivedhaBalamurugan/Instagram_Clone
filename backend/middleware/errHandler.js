const logEvents = require('./logEvents')

const errHandler = (req,res,next) => {

    logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}` , 'err.log')
    const status = res.statusCode ? res.statusCode : 500       //if there is no status code
    res.status(status).json({"message" : err.message})
    next()

}

module.exports = errHandler