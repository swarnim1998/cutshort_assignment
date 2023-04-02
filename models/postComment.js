const Database = require('../configs/database')

const postCommentSchema = Database.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    body: { type: String, required: true },
    stamp: { type: Date, required: true }
})

module.exports = Database.model("postcomment", postCommentSchema)