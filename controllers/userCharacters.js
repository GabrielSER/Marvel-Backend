// controllers/userCharacters.js
const {
  userCharactersModel,
  charactersModel,
  formsModel,
} = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')
const mongoose = require('mongoose')

/** PP at level 1 per POWER stat 1..10 */
const PP_BY_STAT_L1 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
const isHex24 = (v) => /^[a-f\d]{24}$/i.test(String(v || ''))

function bad(code, msg) { throw new ApiError(code, msg) }
const baseHP = (form) => Number(form?.stats?.hp || 0)
const calcPP = (form) => {
  const p = Math.max(1, Math.min(10, Number(form?.stats?.power || 1)))
  return PP_BY_STAT_L1[p]
}

// e.g. "spider-man" -> "Spider-Man"
function denormalizeSlug(s = '') {
  return s
    .split('-')
    .map(p => (p ? p[0].toUpperCase() + p.slice(1) : p))
    .join('-')
}

/**
 * Find character regardless of whether _id was stored as ObjectId or string.
 * Also accepts exact name or a slug-ified name.
 */
async function findCharacterFlexible(idOrName) {
  if (!idOrName) return null
  const raw = String(idOrName).trim()

  // 1) Try by ObjectId (Mongoose cast)
  if (isHex24(raw)) {
    try {
      const byId = await charactersModel.findById(raw).lean()
      if (byId) return byId
    } catch (_) { /* ignore cast errors */ }

    // 1b) Native driver: _id stored as string "63e9..." (no casting)
    const nativeStr = await charactersModel.collection.findOne({ _id: raw })
    if (nativeStr) return nativeStr

    // 1c) Native driver: _id stored as real ObjectId (safety duplicate)
    try {
      const oid = new mongoose.Types.ObjectId(raw)
      const nativeOid = await charactersModel.collection.findOne({ _id: oid })
      if (nativeOid) return nativeOid
    } catch (_) { /* ignore */ }
  } else {
    // 2) Not a 24-hex: maybe string _id (like "Spider-Man") or name
    const nativeStrId = await charactersModel.collection.findOne({ _id: raw })
    if (nativeStrId) return nativeStrId
  }

  // 3) Fallbacks by name
  const byName = await charactersModel.findOne({ name: raw }).lean()
  if (byName) return byName

  const bySlugName = await charactersModel.findOne({ name: denormalizeSlug(raw) }).lean()
  if (bySlugName) return bySlugName

  return null
}

/**
 * Find form regardless of whether _id was stored as ObjectId or string.
 */
async function findFormFlexible(formIdOrName) {
  if (!formIdOrName) return null
  const raw = String(formIdOrName).trim()

  // Try ObjectId via Mongoose
  if (isHex24(raw)) {
    try {
      const byId = await formsModel.findById(raw).lean()
      if (byId) return byId
    } catch (_) { /* ignore */ }

    // Native string _id
    const nativeStr = await formsModel.collection.findOne({ _id: raw })
    if (nativeStr) return nativeStr

    // Native ObjectId _id
    try {
      const oid = new mongoose.Types.ObjectId(raw)
      const nativeOid = await formsModel.collection.findOne({ _id: oid })
      if (nativeOid) return nativeOid
    } catch (_) { /* ignore */ }
  } else {
    // Maybe the form _id is a string
    const nativeStr = await formsModel.collection.findOne({ _id: raw })
    if (nativeStr) return nativeStr
  }

  // Optional: fallback by name
  const byName = await formsModel.findOne({ name: raw }).lean()
  if (byName) return byName

  return null
}

/**
 * Create sheet from character's default form.
 * Accepts id OR name for character.
 */
async function createSheet(userId, characterIdOrName) {
  const ch = await findCharacterFlexible(characterIdOrName)
  if (!ch) bad(ErrorCode.NOT_FOUND, 'Character not found')

  if (!ch.defaultForm) bad(ErrorCode.BAD_REQUEST, 'Character has no defaultForm')

  const form = await findFormFlexible(ch.defaultForm)
  if (!form) bad(ErrorCode.BAD_REQUEST, `Default form not found for character ${ch.name || ch._id}`)

  const maxHP = baseHP(form)
  const maxPP = calcPP(form)

  const doc = await userCharactersModel.create({
    userId: String(userId || 'PUBLIC_DEBUG_USER'),
    characterId: String(ch._id),    // store as string consistently
    formId: String(form._id),       // store as string consistently
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
    notes: ''
  })

  return doc
}

async function getMine(userId) {
  return userCharactersModel
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

module.exports = { createSheet, getMine, getOne }
