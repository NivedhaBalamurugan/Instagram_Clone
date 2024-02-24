require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const loginHandler = require('./middleware/loginHandler')
const errHandler = require('./middleware/errHandler')
const dbConn = require('./config/dbConn')
const mongoose = require('mongoose')
const logEvents = require('./middleware/logEvents')

const PORT = process.env.PORT || 3500

//dbconn
dbConn()

//3rd party middleware
app.use(cors(corsOptions))
app.use(cookieParser())

//custom middleware
app.use(loginHandler)

//builtin middleware
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))    //css


app.use('/users' , require('./routes/userRoutes'))  //users
app.use('/posts' , require('./routes/postRoutes'))  //posts
app.use('/' , require('./routes/root'))  //root page

//custom 404
app.all('*' , (req,res) => {

    res.status(404)
    if(req.accepts('.html'))
        res.sendFile(path.join(__dirname,'views','404.html'));
    else if(req.accepts('json'))
        res.json({"message" : "404 not found"})
    else    
        res.type('txt').send("404 not found")

})

//custom middleware
app.use(errHandler)

mongoose.connection.once('open' , () => {
    
    console.log("connected to mongo db")
    app.listen(PORT, () => console.log(`Server listening in ${PORT}`))

})

mongoose.connection.on("error" , (err) => {

    console.log(err)
    logEvents(`${err.no} : ${err.code}\t${err.syscall}\t${err.hostname}` , 'mongoerr.log')

})



