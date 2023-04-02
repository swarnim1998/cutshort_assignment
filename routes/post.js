const Express = require('express')
const Router = Express.Router()

//services
const {createPost, comment, getPosts, getComments, updatePost, deletePost} = require('../services/post')

Router.get('/', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content: await getPosts(req.profile, req.query)
            }
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally{
        next()
    }
})

Router.post('/', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content:  await createPost(req.profile, req.body)
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

Router.post('/comment', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content: await comment(req.profile, req.query, req.body)
            }            
        }
    } catch (error) {
        res.locals.status = {
            error: {
             message: error.message,
             code: error.statusCode || 401
            }
        }
    } finally{
        next()
    }
})

Router.get('/comment', async (req, res, next) => {
    try {
        if(!res.locals.status){
            res.locals.status = {
                content: await getComments(req.query)
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
                content:  await updatePost(req.params, req.body)
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
                content: await deletePost(req.params)
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