const { nextTick } = require("process")

module.exports = (req, res, next) => {
    if(res.locals.status.content){
        res.type('json').status(201).send(res.locals.status)
    } else {
        next()
    }
 }