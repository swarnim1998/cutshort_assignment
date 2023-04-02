const Joi = require('@hapi/joi')

const USER_SIGNUP_SCHEMA = Joi.object({
    email: Joi.string().email().required(),
    user: Joi.string().required(),
    password: Joi.string().required()
})

const USER_SIGNIN_SCHEMA = Joi.object({
    key: Joi.string().pattern(new RegExp('^[A-Za-z0-9 ]*$')).required(),
    password: Joi.string().required()
})

const EMAIL_SIGNIN_SCHEMA = Joi.object({
    key: Joi.string().email().required(),
    password: Joi.string().required()
})

const CREATE_TODO_SCHEMA = Joi.object({
    title: Joi.string().required()
})

const CREATE_POST_SCHEMA = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
})

const UPDATE_POST_SCHEMA = Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional()
})

const UPDATE_TODO_SCHEMA = Joi.object({
    title: Joi.string().optional(),
    completed: Joi.boolean().optional()
})

const QUERY_SCHEMA = Joi.object({
    id: Joi.string().required(),
    page: Joi.number().optional()
})

const POST_COMMENT_SCHEMA = Joi.object({
    body: Joi.string().required()
})

module.exports = { UPDATE_POST_SCHEMA, POST_COMMENT_SCHEMA, UPDATE_TODO_SCHEMA, QUERY_SCHEMA ,USER_SIGNIN_SCHEMA, USER_SIGNUP_SCHEMA, EMAIL_SIGNIN_SCHEMA, CREATE_TODO_SCHEMA, CREATE_POST_SCHEMA }