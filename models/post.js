const Database = require('../configs/database')

const postSchema = Database.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    stamp: { type: Date, required: true }
})

module.exports = Database.model("post", postSchema)