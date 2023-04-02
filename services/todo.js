//libraries
const Moment = require('moment')
const { ObjectId } = require('mongodb')

//models
const ToDo = require('../models/todo')

//constants
const { CREATE_TODO_SCHEMA, UPDATE_TODO_SCHEMA, QUERY_SCHEMA } = require('../validations/joi')

/**
 * @define returns todo list data
 * @param {*} profile 
 * @param {*} query 
 */
module.exports.getToDos = async (profile, query) => {
    try {
        const pipeline = []

        /**to get the data for a specific todo list or for a specific user*/
        if (query?.id) {
            pipeline.push({
                $match: {
                    id: ObjectId(query.id)
                }
            })
        } else if (query?.userId) {
            pipeline.push({
                $match: {
                    userId: query.userId
                }
            })
        }

        const skip = (query.page -1) * 5
        const limit = 5 
        const response = await ToDo.aggregate([
            ...pipeline,
            {
                $group: {
                    _id: '$_id',
                    id: {
                        $first: '$_id'
                    },
                    userId: {
                        $first: '$userId'
                    },
                    title: {
                        $first: '$title'
                    },
                    completed: {
                        $first: '$completed'
                    },
                    lastUpdate: {
                        $first: '$lastUpdate'
                    }
                }
            },
            {
                $addFields: {
                    id: {
                        $toString: '$id'
                    },
                    uId: {
                        $toObjectId: '$userId'
                    },
                    editable: {
                        $cond: {
                            if: {
                                $or: [
                                    { $eq: ['$userId', profile._id.toString()] },
                                    { $eq: [profile.privilege.globalAdmin, true] }
                                ]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: '$uId'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$userId']
                                }
                            }
                        }
                    ],
                    as: 'users'
                }
            },
            {
                $unwind: {
                    path: '$users',
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $project: {
                    id: '$id',
                    title: '$title',
                    completed: '$completed',
                    createdBy: '$users.user',
                    editable: '$editable',
                    lastUpdate: '$lastUpdate'
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]).allowDiskUse(true)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * @define creates todolist 
 * @param {*} profile 
 * @param {*} body 
 */
module.exports.createToDo = async (profile, body) => {
    try {
        await CREATE_TODO_SCHEMA.validateAsync(body)
        await ToDo.insertMany([{
            ...body,
            userId: profile._id.toString(),
            completed: false,
            lastUpdate: Moment.utc().toISOString()
        }])
        return "ToDo Successfully Created"
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * @define updates todo
 * @param {*} query 
 * @param {*} body 
 */
module.exports.updateToDo = async (query, body) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        await UPDATE_TODO_SCHEMA.validateAsync(body)
        await ToDo.updateOne({ _id: new ObjectId(query.id) }, { $set: { ...body } })
        return "ToDo Successfully Updated"
    } catch (error) {
        throw error
    }
}

/**
 * @define deletes todo
 * @param {*} query 
 */
module.exports.deleteToDo = async (query) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        await ToDo.deleteMany({ _id: new ObjectId(query.id) }, {})
        return "ToDo Successfully Deleted"
    } catch (error) {
        throw error
    }
}