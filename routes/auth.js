const Express = require('express')
const Router = Express.Router()

//services
const {signUp, signIn} = require('../services/auth')

Router.post('/signup', async (req, res, next) => {
    try {
        const result = await signUp(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

Router.post('/signIn', async (req, res, next) => {
    try {
        const result = await signIn(req.body);
        res.status(200).send(result)
        // res.set('auth-token', authToken)
        // res.set('refresh-token', refreshToken).sendStatus(200)
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = Router