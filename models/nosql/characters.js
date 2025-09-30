const mongoose = require('mongoose')
const { Schema } = mongoose

const CharacterType = {
    HERO: { value: 'hero' },
    VILLAIN: { value: 'villain' },
    NPC: { value: 'npc' }
}

const typeValues = Object.values(CharacterType).map(type => type.value)

const CharacterSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: String,
    alterego: String,
    description: String,
    logo: String,
    image: String,
    types: [{
      type: String,
      enum: typeValues,
      default: CharacterType.HERO.value
    }],
    defaultForm: { type: Schema.Types.ObjectId, ref: 'forms' },  // FIX
    forms: [{ type: Schema.Types.ObjectId, ref: 'forms' }],      // FIX
    order: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)


const charactersModel = mongoose.model('characters', CharacterSchema)

module.exports = { charactersModel, CharacterType }
