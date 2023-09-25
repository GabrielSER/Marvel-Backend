const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FormScheme = new Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String
        },
        inheritedAttributes: [{
            type: String
        }],
        attributes: [{
            type: String
        }],
        abilities: [{
            type: String
        }],
        weaknesses: [{
            type: String
        }],
        powers: [{
            type: String
        }],
        type: {
            type: ['normal', 'alternate', 'armor'],
            default: 'hero'
        },
        character: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('forms', FormScheme)