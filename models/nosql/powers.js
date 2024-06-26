const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const PowerScheme = new Schema(
    {
        _id: { 
            type: ObjectId,
            auto: true 
        },
        name: {
            type: String,
        },
        level: {
            type: Number
        },
        bonusDamage: {
            type: String,
        },
        type: {
            type: String
        },
        skillCheck: {
            type: String
        },
        description: {
            type: String
        },
        amountDice: {
            type: Number
        },
        diceNumber: {
            type: Number
        },
        healing: {
            type: Boolean
        },
        statusEffect: [{
            type: String
        }],
        chance: [{
            type: Number
        }],
        module: {
            type: String
        },
        character: {
            type: String
        },
        form: {
            type: String
        }
    }
)

const powersModel = mongoose.model('powers', PowerScheme)

module.exports = {
    powersModel
}