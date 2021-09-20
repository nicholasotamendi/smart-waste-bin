const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BinSchema = new Schema({
    level: String,
    smell: String,
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("bin", BinSchema)