const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const CharacterSheetScheme = new Schema(
    {
        characterId: {
            type: ObjectId,
            index : true
        },
        userId: {
            type: ObjectId,
            index: true
        },
        formSheets: {
            type: [ObjectId]
        }
    }
)

module.exports = mongoose.model('character_sheets', CharacterSheetScheme)