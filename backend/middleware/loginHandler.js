const logEvents = require('./logEvents')

const loginHandler = (req,res,next) => {

    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}` , 'login.log')
    next()

}

module.exports = loginHandler