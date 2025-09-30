// controllers/userCharacters.js
const {
  userCharactersModel,
  charactersModel,
  formsModel,
} = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')
const mongoose = require('mongoose')

// PP progression based on POWER stat at level 1
const PP_BY_STAT_L1 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
const isOID = (v) => mongoose.Types.ObjectId.isValid(String(v))

function bad(code, msg) {
  throw new ApiError(code, msg)
}

const baseHP = (form) => Number(form?.stats?.hp || 0)
const calcPP = (form) => {
  const p = Math.max(1, Math.min(10, Number(form?.stats?.power || 1)))
  return PP_BY_STAT_L1[p]
}

// normalize a slug like "spider-man" back to "Spider-Man"
function denormalizeSlug(s = '') {
  if (!s) return s
  return s
    .split('-')
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p))
    .join('-')
}

async function findCharacterByIdOrName(idOrName) {
  console.log("Looking up characterId:", characterId)
const found = await charactersModel.findById(characterId).lean()
console.log("Direct findById result:", found)


  if (!idOrName) return null
  const raw = String(idOrName).trim()

  // 🔑 FIX: let mongoose handle coercion
  const byId = await charactersModel.findById(raw).lean()
  if (byId) return byId

  // fallback by name
  const byName = await charactersModel.findOne({ name: raw }).lean()
  if (byName) return byName

  return charactersModel.findOne({ name: denormalizeSlug(raw) }).lean()
}

async function createSheet(userId, characterIdOrName) {
  console.log('createSheet payload:', { userId, characterIdOrName })

  const ch = await findCharacterByIdOrName(characterIdOrName)
  if (!ch) bad(ErrorCode.NOT_FOUND, 'Character not found')

  if (!ch.defaultForm) bad(ErrorCode.BAD_REQUEST, 'Character has no defaultForm')

  const form = await formsModel.findById(ch.defaultForm).lean()
  if (!form) bad(ErrorCode.BAD_REQUEST, 'Default form not found')

  const maxHP = baseHP(form)
  const maxPP = calcPP(form)

  const doc = await userCharactersModel.create({
    userId: String(userId || 'PUBLIC_DEBUG_USER'),
    characterId: String(ch._id),
    formId: String(form._id),
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
}

async function getMine(userId) {
  return await userCharactersModel
    .find({ userId: String(userId || 'PUBLIC_DEBUG_USER') })
    .lean()
}

async function getOne(userId, id) {
  const doc = await userCharactersModel.findById(id).lean()
  if (!doc) bad(ErrorCode.NOT_FOUND, 'Sheet not found')
  if (String(doc.userId) !== String(userId || 'PUBLIC_DEBUG_USER')) {
    bad(ErrorCode.UNAUTHORIZED, 'Not your sheet')
  }
  return doc
}

module.exports = {
  createSheet,
  getMine,
  getOne,
}
