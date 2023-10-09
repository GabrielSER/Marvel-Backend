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

const typeValues = Object.values(AttributeType).map(type => type.value)

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
            type: String,
            enum: typeValues,
            default: AttributeType.SKILL.value
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