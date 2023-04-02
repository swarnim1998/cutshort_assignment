const Database = require('../configs/database')

const toDoSchema = Database.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    lastUpdate: { type: Date, required: true }
})

module.exports = Database.model("todo", toDoSchema)