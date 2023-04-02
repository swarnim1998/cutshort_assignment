//libraries
const Moment = require('moment')
const { ObjectId } = require('mongodb')
const HttpError = require('http-errors')

//models
const Post = require('../models/post')
const PostComment = require('../models/postComment')

//constants
const { CREATE_POST_SCHEMA, POST_COMMENT_SCHEMA, UPDATE_POST_SCHEMA, QUERY_SCHEMA } = require('../validations/joi')

module.exports.createPost = async (profile, body) => {
    try {
        await CREATE_POST_SCHEMA.validateAsync(body)
        await Post.insertMany([{
            ...body,
            userId: profile._id.toString(),
            stamp: Moment.utc().toISOString()
        }])
        return "Post Successfully Created"
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports.getPosts = (profile) => {
    try {
        return Post.aggregate([
            {
                $addFields: {
                    id: {
                        $toString: '$_id'
                    },
                    userId: {
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
                        userId: '$userId'
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
                $unwind: '$users'
            },
            {
                $project: {
                    id: '$id',
                    title: '$title',
                    body: '$body',
                    createdBy: '$users.user',
                    editable: '$editable',
                    stamp: '$stamp'
                }
            }
        ])
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports.comment = async (profile, query, body) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        await POST_COMMENT_SCHEMA.validateAsync(body)

        /**valiating post exist or not */
        const post = await Post.findOne({ _id: new ObjectId(query.id) }, { _id: 1 }, { lean: true })
        if (!post) {
            throw new HttpError(422, 'Post does not exist.')
        }

        await PostComment.insertMany([{
            ...body,
            postId: query.id,
            userId: profile._id.toString(),
            stamp: Moment.utc().toISOString()
        }])
        return "Comment added Successfully"
    } catch (error) {
        throw error
    }
}

module.exports.getComments = async (query) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        return PostComment.aggregate([
            {
                $match: {
                    postId: query.id
                }
            },
            {
                $addFields: {
                    id: {
                        $toString: '$_id'
                    },
                    userId: {
                        $toObjectId: '$userId'
                    },
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: '$userId'
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
                    body: '$body',
                    createdBy: '$users.user',
                    stamp: '$stamp'
                }
            }
        ])
    } catch (error) {
        throw error
    }
}

module.exports.updatePost = async (query, body) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        await UPDATE_POST_SCHEMA.validateAsync(body)
        await Post.updateOne({ _id: new ObjectId(query.id) }, { $set: { ...body } })
        return "ToDo Successfully Updated"
    } catch (error) {
        throw error
    }
}

module.exports.deletePost = async (query) => {
    try {
        await QUERY_SCHEMA.validateAsync(query)
        await Post.deleteMany({ _id: new ObjectId(query.id) }, {})
        return "ToDo Successfully Deleted"
    } catch (error) {
        throw error
    }
}