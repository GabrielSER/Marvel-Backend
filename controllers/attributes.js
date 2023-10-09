const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { attributeModel, AttributeType } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

const attributesById = new Map()
const attributeByUnique = new Map()

const indexAttribute = (id, attribute) => {
    attributesById.set(id.toHexString(), attribute)
    attributeByUnique.set(attribute.uniqueName, attribute)
}

const clearIndex = (id) => {
    const hexStringId = id.toHexString()
    const attribute = attributesById.get(hexStringId)
    attributesById.delete(hexStringId)
    if (attribute) {
        attributeByUnique.delete(attribute.uniqueName)
    }
}

const bootstrap = async () => {
    console.log(' - Indexing attributes...')
    const attributes = await attributeModel.find({})
    attributes.forEach((attribute) => indexAttribute(attribute._id, attribute))
    console.log(` - Indexed ${attributes.length} attributes`)
}

const getAttributes = async () =>
    Array(...attributesById.values())

const getAttribute = async (id) => {
    let attribute = attributesById.get(new ObjectId(id))
    if (attribute) {
        return attribute
    }
    attribute = await attributeModel.findById(id)
    if (!attribute) {
        throw ApiError(ErrorCode.NOT_FOUND)
    }
    indexAttribute(id, attribute)
    return attribute
}

const getAttributeSync = (id) =>
    attributesById.get(id.toHexString())

const createAttribute = async (attribute) => {
    const {
        uniqueName,
        name,
        type = AttributeType.SKILL,
        levelable = true,
        learnable = false
    } = attribute

    if (!uniqueName) {
        throw ApiError(ErrorCode.BAD_REQUEST, 'No unique name defined')
    }
    if (!name) {
        throw ApiError(ErrorCode.BAD_REQUEST, 'No name defined')
    }
    await verifyUniqueName(uniqueName)
    const attributeModel = await attributeModel.create({
        uniqueName,
        name,
        type,
        levelable,
        learnable
    })
    indexAttribute(id, attributeModel)
    return attributeModel
}

const updateAttribute = async (id, changes) => {
    const currentAttribute = await getAttribute(id)
    if (changes.uniqueName && changes.uniqueName != currentAttribute.uniqueName) {
        await verifyUniqueName(uniqueName)
    }
    const attributeModel = await attributeModel.findByIdAndUpdate(id, changes, { new: true })
    indexAttribute(id, attributeModel)
    return attributeModel
}

const deleteAttribute = async (id) => {
    const result = await attributeModel.findByIdAndDelete(id)
    if (!result) {
        throw ApiError(ErrorCode.NOT_FOUND)
    }
    clearIndex(result._id)
    return result
}

const verifyUniqueName = async (uniqueName) => {
    if (await attributeModel.find({ uniqueName })) {
        throw ApiError(ErrorCode.BAD_REQUEST, 'There is already an attribute with this unique name')
    }
}

module.exports = {
    bootstrap,
    getAttributes,
    getAttribute,
    getAttributeSync,
    createAttribute,
    updateAttribute,
    deleteAttribute
}