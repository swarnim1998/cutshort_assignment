//libraries
const Bcrypt = require('bcryptjs')
const Moment = require('moment')
const HttpError = require('http-errors')
const JSONWebToken = require('jsonwebtoken')

//models
const User = require('../models/user')

//utilities and constants
const { authKey } = require('../constants')
const { USER_SIGNIN_SCHEMA, USER_SIGNUP_SCHEMA, EMAIL_SIGNIN_SCHEMA } = require('../validations/joi')

async function validateSignUp(body) {
    const isUserPresent = await User.findOne({ $or: [{ email: body.email }, { user: body.user }] }, { id: 1 }, { lean: true })
    if (isUserPresent) {
        throw new Error(`User with name ${body.user} or email ${body.email} already present in db`)
    }
}

async function validateLogin(body) {
    let type
    try {
        await USER_SIGNIN_SCHEMA.validateAsync(body)
        type = "user"
    } catch (error) {
        try {
            await EMAIL_SIGNIN_SCHEMA.validateAsync(body)
            type = "email"
        } catch (error) {
            throw new HttpError(401, "Please enter valid email address or userName")
        }
    }

    const user = await User.findOne({ $or: [{ email: body.key }, { user: body.key }] }, { _id: 0 }, { lean: true })
    if (!user) {
        throw new HttpError(401, 'User with the provided ' + (type === 'email' ? 'Email' : 'UserName') + ' does not exist.')
    } else if (!Bcrypt.compareSync(body.password, user.password)) {
        throw new HttpError(401, `Provided password is incorrect for user ${body.key}`)
    }

    return user
}

function processToken(token, key, expiry) {
    return new Promise((resolve, reject) => {
        JSONWebToken.sign(token, key, expiry, (error, token) => {
            error ? reject(error) : resolve(token)
        })
    })
}

function validateToken(token, key) {
    return new Promise((resolve, reject) => {
        JSONWebToken.verify(token, key, (error, token) => {
            error ? reject(error) : resolve(token)
        })
    })
}

module.exports.validate = async (token) => {
    try {
        if (!token) { throw new HttpError(401, 'Authorisation Token was not present in the header.') }
        else {
            let queryCondition = {}
            const Key = process.env.authKey || authKey
            token = await validateToken(token, Key)
            queryCondition = { user: token.user }

            let credential = await User.findOne(queryCondition, {}, { lean: true })
            if (!credential) {
                throw new HttpError(401, 'Provided Authorisation Token is not a valid one.')
            }
            else {
                return credential
            }
        }
    } catch (error) {
        if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
            throw new HttpError(401, 'Provided Authorisation Token is not a valid one.')
        }
        throw error
    }
}

module.exports.signUp = async (body) => {
    try {
        await USER_SIGNUP_SCHEMA.validateAsync()
        await validateSignUp(body)
        await User.insertMany([{
            ...body,
            password: Bcrypt.hashSync(body.password, 10),
            session: [],
            lastUpdate: Moment.utc().toISOString()
        }])
        return "User Successfully Created"
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports.signIn = async (body) => {
    try {
        const credential = await validateLogin(body)
        let timeNow = Moment.utc().millisecond(0)
        let authTokenExpiry = Moment.utc(timeNow).add(1, 'day').hour(0).minute(0).second(0)
        let refreshTokenExpiry = Moment.utc(timeNow).add(90, 'days').hour(0).minute(0).second(0)
        let key = process.env.authKey || authKey
        let authToken = await processToken({ user: credential.user }, key, { expiresIn: authTokenExpiry.diff(timeNow, 'seconds') })
        let refreshToken = await processToken({ user: credential.user }, key, { expiresIn: refreshTokenExpiry.diff(timeNow, 'seconds') })
        await User.updateOne({ user: body.user }, { $set: { 'lastLogin': Moment.utc().toISOString() } }, {})
        return { authToken, refreshToken }
    } catch (error) {
        console.log(error)
        throw error
    }
}
