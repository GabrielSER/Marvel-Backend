const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const AttributeType = {
    STAT: {
        value: 'stat'
    },
    SKILL: {
        value: 'skill'
    },
    SPECIAL: {
        value: 'special'
    }
}

const typeValues = Object.entries(AttributeType).map((_, value) => {value})

const AttributeScheme = new Schema(
    {
        _id: ObjectId,
        uniqueName: {
            type: String
        },
        name: {
            type: String
        },
        type: {
            type: typeValues,
            default: AttributeType.SKILL
        },
        levelable: {
            type: Boolean
        },
        learnable: {
            type: Boolean
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = {
    attributeModel: mongoose.model('attributes', AttributeScheme),
    AttributeType
}