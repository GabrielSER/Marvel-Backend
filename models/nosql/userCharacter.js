// models/nosql/userCharacter.js
const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Types

const AllocationSchema = new Schema(
  { key: { type: String, required: true }, value: { type: Number, required: true } },
  { _id: false }
)

const UnlockedPowerSchema = new Schema(
  { powerId: { type: String, required: true }, level: { type: Number, required: true } },
  { _id: false }
)

const UserCharacterSchema = new Schema(
  {
    _id: { type: ObjectId, auto: true },
    userId: { type: String, required: true },
    characterId: { type: String, required: true },
    formId: { type: String, required: true },

    level:   { type: Number, default: 1, min: 1, max: 20 },
    totalSP: { type: Number, default: 10 },
    spentSP: { type: Number, default: 0 },

    maxHP:     { type: Number, required: true, default: 0 },
    maxPP:     { type: Number, required: true, default: 0 },
    currentHP: { type: Number, required: true, default: 0 },
    currentPP: { type: Number, required: true, default: 0 },

    skillLevels:   [AllocationSchema],
    statOverrides: [AllocationSchema],
    unlockedPowers:[UnlockedPowerSchema],

    notes: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false }
)

const userCharactersModel = mongoose.model('userCharacters', UserCharacterSchema)
module.exports = { userCharactersModel }
