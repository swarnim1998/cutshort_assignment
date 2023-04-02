const Database = require('mongoose')

Database.connect(process.env.DB_URL + process.env.DB_NAME + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
Database.connection.on('error', console.error.bind(console))

module.exports = Database
