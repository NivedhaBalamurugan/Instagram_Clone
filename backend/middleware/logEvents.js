const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises
const {v4 : uuid} = require('uuid')
const {format} = require('date-fns')

const logEvents = async ( msg, filename) => {
    
    const datetime = format(new Date() , 'yyyyMMdd\tHH:mm:ss')
    const item = `${datetime}\t${uuid()}\t${msg}\n`

    try {

        if(!fs.existsSync(path.join(__dirname, '..','logs')))   
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        await fsPromises.appendFile(path.join(__dirname,'..','logs',filename) , item )

    }   catch(err){
        console.log(err.messgage)
    }


}   

module.exports = logEvents