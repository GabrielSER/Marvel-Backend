const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const CharacterScheme = new Schema(
    {
        _id: ObjectId,
        name: {
            type: String
        },
        alterego: {
            type: String
        },
        description: {
            type: String
        },
        logo: {
            type: String
        },
        types: {
            type: ['hero', 'villain', 'npc'],
            default: 'hero'
        },
        defaultForm: {
            type: String,
        },
        forms: [{
            type: String,
        }],
        order: {
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('characters', CharacterScheme)