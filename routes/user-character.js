// routes/user-character.js
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { handleError } = require('../common/apiError')
const { userCharactersModel, charactersModel, formsModel } = require('../models')

const isHex24 = (v) => /^[a-f\d]{24}$/i.test(String(v || ''))
const PP_BY_STAT_L1 = [0,2,4,6,8,10,12,14,16,18,20]
const baseHP = (form) => Number(form?.stats?.hp || 0)
const calcPP = (form) => {
  const p = Math.max(1, Math.min(10, Number(form?.stats?.power || 1)))
  return PP_BY_STAT_L1[p]
}
const denormalizeSlug = (s='') =>
  s.split('-').map(p => p ? p[0].toUpperCase()+p.slice(1) : p).join('-')

// ---------- flexible finders (work with ObjectId OR string _id) ----------
async function findCharacterFlexible(idOrName) {
  if (!idOrName) return null
  const raw = String(idOrName).trim()

  // Try by native string _id
  let doc = await charactersModel.collection.findOne({ _id: raw })
  if (doc) return doc

  // Try by ObjectId _id
  if (isHex24(raw)) {
    try {
      const oid = new mongoose.Types.ObjectId(raw)
      doc = await charactersModel.collection.findOne({ _id: oid })
      if (doc) return doc
    } catch (_) {}
  }

  // Try by name
  doc = await charactersModel.collection.findOne({ name: raw })
  if (doc) return doc

  // Try by denormalized slugged name
  doc = await charactersModel.collection.findOne({ name: denormalizeSlug(raw) })
  if (doc) return doc

  return null
}

async function findFormFlexible(idOrName) {
  if (!idOrName) return null
  const raw = String(idOrName).trim()

  // Try by native string _id
  let doc = await formsModel.collection.findOne({ _id: raw })
  if (doc) return doc

  // Try by ObjectId _id
  if (isHex24(raw)) {
    try {
      const oid = new mongoose.Types.ObjectId(raw)
      doc = await formsModel.collection.findOne({ _id: oid })
      if (doc) return doc
    } catch (_) {}
  }

  // Optional fallback by name
  doc = await formsModel.collection.findOne({ name: raw })
  if (doc) return doc

  return null
}

// ---------- routes ----------
router.get('/ping', (_req, res) => res.json({ ok: true }))

// List my sheets (no auth dependency while debugging)
router.get(
  '/',
  handleError(async (req) => {
    const userId = (req.user && req.user.id) || 'PUBLIC_DEBUG_USER'
    return await userCharactersModel.find({ userId: String(userId) }).lean()
  })
)

// Create a sheet from a character (accepts id OR name/slug)
router.post(
  '/',
  handleError(async (req) => {
    const { characterId } = req.body || {}
    const userId = (req.user && req.user.id) || 'PUBLIC_DEBUG_USER'

    console.log('POST /api/user-character body:', req.body)

    const ch = await findCharacterFlexible(characterId)
    console.log('Resolved character:', ch ? { _id: ch._id, name: ch.name, defaultForm: ch.defaultForm } : null)
    if (!ch) {
      const err = new Error('Character not found')
      err.statusCode = 404
      throw err
    }

    if (!ch.defaultForm) {
      const err = new Error('Character has no defaultForm')
      err.statusCode = 400
      throw err
    }

    const form = await findFormFlexible(ch.defaultForm)
    console.log('Resolved form:', form ? { _id: form._id, name: form.name } : null)
    if (!form) {
      const err = new Error('Default form not found')
      err.statusCode = 400
      throw err
    }

    const maxHP = baseHP(form)
    const maxPP = calcPP(form)

    const created = await userCharactersModel.create({
      userId: String(userId),
      characterId: String(ch._id),     // store as string consistently
      formId: String(form._id),        // store as string consistently
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

    return created
  })
)

module.exports = router
