const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const AttributeValueScheme = new Schema(
    {
        _id: { 
            type: ObjectId,
            auto: true 
        },
        attributeId: {
            type: ObjectId
        },
        value: {
            type: Number
        }
    }
)

const attributeValuesModel = mongoose.model('attribute_values', AttributeValueScheme)

const AttributesStackScheme = new Schema(
    {
        _id: ObjectId,
        formId: {
            type: ObjectId
        },
        stats: [AttributeValueScheme],
        skills: [AttributeValueScheme],
        specialSkills: [AttributeValueScheme]
    }
)

const attributeStacksModel = mongoose.model('attribute_stacks', AttributesStackScheme)

module.exports = {
    attributeValuesModel,
    AttributesStackScheme,
    attributeStacksModel
}