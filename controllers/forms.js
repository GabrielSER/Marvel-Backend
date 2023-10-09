const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { formsModel, attributeModel } = require('../models')
const { getAttributeSync } = require('./attributes')
const { ApiError, ErrorCode } = require('../common/apiError')

const getForms = async () =>
  (await formsModel.find({})).map(formView)

const getForm = async (id) =>
  formView(await formsModel.findById(id))

const createForm = async (form) =>
  formView(await formsModel.create(form))

const updateForm = async (id, changes) => {
  const result = await formsModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return formView(result)
}

const addAttribute = async (attribute) => {
  const {
    uniqueName,
    name,
    value = 1,
    type = AttributeType.SKILL
  } = attribute
  if (!uniqueName) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  if (!name) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  const currentAttribute = await attributeModel.find({ uniqueName })
  if (!currentAttribute) {
    attributeModel.create({
      uniqueName,
      name,
      type,
      levelable: false,
      learnable: false
    })
  }
  return result
}

const deleteForm = async (id) => {
  const result = await formsModel.findByIdAndDelete(id)
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return formView(result)
}

const formView = (form) => {
  const { attributeStack } = form
  const { stats, skills, specialSkills } = attributeStack
  const view = {
    ...form.toObject(),
    stats: attributesView(stats),
    skills: attributesView(skills),
    specialSkills: attributesView(specialSkills)
  }
  delete view.attributeStack
  return view
}

const attributesView = (attributes) =>
  attributes.map(attributeValue => {
    const { _id, attributeId, value } = attributeValue
    const attribute = getAttributeSync(attributeId)
    const { name, uniqueName } = attribute
    return {
      _id,
      attributeId,
      name,
      uniqueName,
      value
    }
  })

module.exports = {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm
}