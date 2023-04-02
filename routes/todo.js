const Express = require('express')
const Router = Express.Router()

//services
const {createToDo, updateToDo, deleteToDo, getToDos} = require('../services/todo')

Router.get('/', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content:  await getToDos(req.profile, req.query)
            }
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally {
       next()
    }
})

Router.post('/', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content:  await createToDo(req.profile, req.body)
            }
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally {
       next()
    }
})

Router.patch('/:id', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content:  await updateToDo(req.params, req.body)
            }
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally {
       next()
    }
})

Router.delete('/:id', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content:  await deleteToDo(req.params)
            }
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally {
       next()
    }
})
module.exports = Router