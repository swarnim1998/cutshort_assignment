const { validate: validateToken } = require('../services/auth')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['auth-token']
        const res = await validateToken(token)
        req.profile = res
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
}