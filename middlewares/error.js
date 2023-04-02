module.exports = (req, res, next) => {
   if(res.locals.status.error){
       res.type('json').status(res.locals.status.error.code || 401).send(res.locals.status.error)
   } {
       next()
   }
}