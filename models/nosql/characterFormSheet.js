const mongoose = require('mongoose')
const { Schema } = mongoose

const CharacterProperties = {
    type: Map,
    of: Number
}

const CharacterFormSheetScheme = new Schema(
    {
        formOverrides: {
            type: {
                stats: CharacterProperties,
                skills: CharacterProperties,
                specialSkills: CharacterProperties
            }
        }
    }
)

module.exports = mongoose.model('character_form_sheets', CharacterFormSheetScheme)
