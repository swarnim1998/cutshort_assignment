const Database = require('../configs/database')

const credentialSchema = Database.Schema({
    email: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, minlength: 60, maxlength: 60, required: true },
    privilege: {
      globalAdmin: { type: Boolean, default: false, required: true }
    },
    session: [{ type: String, required: true }],
    lastLogin: { type: Date, required: false },
    lastUpdate: { type: Date, required: true },
})

credentialSchema.index({ email: 1 }, { unique: true })
credentialSchema.index({ user: 1 }, { unique: true })

module.exports = Database.model('Users', credentialSchema)