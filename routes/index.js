const Express = require('express')
const Router = Express.Router()

Router.use('/user', require('./auth'))

/**token validation */
Router.use(require('../middlewares/token'))
Router.use('/todo', require('./todo'))
Router.use('/post', require('./post'))

Router.use(require('../middlewares/result'))
Router.use(require('../middlewares/error'))
module.exports = Router