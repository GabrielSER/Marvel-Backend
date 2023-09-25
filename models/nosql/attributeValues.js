const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const AttributeValueScheme = new Schema(
    {
        _id: ObjectId,
        attributeId: {
            type: ObjectId
        },
        value: {
            type: Number
        },
        formId: {
            type: ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('attributeValues', AttributeValueScheme)