const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const { userCharactersModel, charactersModel, formsModel } = require('../models')

// Create a new user character sheet
router.post(
  '/',
  handleError(async (req) => {
    const { characterId } = req.body
    const userId = (req.user && req.user.id) || 'PUBLIC_DEBUG_USER'

    console.log('POST /api/user-character body:', req.body)

    const character = await charactersModel.findById(characterId).lean()
    if (!character) {
      console.log("Trying to find byId:", characterId)
const byId = await charactersModel.findById(characterId).lean()
console.log("findById result:", byId)

const byRaw = await charactersModel.findOne({ _id: characterId }).lean()
console.log("findOne by raw string:", byRaw)

const allChars = await charactersModel.find({}, { _id: 1, name: 1 }).limit(5).lean()
console.log("Sample characters in DB:", allChars)

      console.log("Incoming body:", req.body)

      throw new Error('Character not found')
    }

    const form = await formsModel.findById(character.defaultForm).lean()
    if (!form) {
      throw new Error('Default form not found')
    }

    const maxHP = Number(form.stats?.hp || 0)
    const power = Number(form.stats?.power || 1)
    const maxPP = [0,2,4,6,8,10,12,14,16,18,20][power]

    const doc = await userCharactersModel.create({
      userId,
      characterId: character._id,
      formId: form._id,
      level: 1,
      totalSP: 10,
      spentSP: 0,
      maxHP,
      maxPP,
      currentHP: maxHP,
      currentPP: maxPP,
      skillLevels: [],
      statOverrides: [],
      unlockedPowers: [],
      notes: '',
    })

    return doc
  })
)

// List my characters
router.get(
  '/',
  handleError(async (req) => {
    const userId = (req.user && req.user.id) || 'PUBLIC_DEBUG_USER'
    return userCharactersModel.find({ userId }).lean()
  })
)

module.exports = router
