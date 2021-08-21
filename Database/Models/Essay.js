const mongoose = require('mongoose')

const essaySchema = mongoose.Schema({
    title: {type: 'String', required: true},
    author: {type: 'String', required: true},
    body: {type: 'String', required: true}
},
{
    timestamps: true
})

module.exports = mongoose.model('Essays', essaySchema)