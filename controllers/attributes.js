const { attributeModel } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

const getAttributes = async () =>
    await attributeModel.find({})

const getAttribute = async (id) =>
    await attributeModel.findById(id)

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
    return await attributeModel.create({
        uniqueName,
        name,
        type,
        levelable,
        learnable
    })
}

const updateAttribute = async (id, changes) => {
    const currentAttribute = await getAttribute(id)
    if (!currentAttribute) {
        throw ApiError(ErrorCode.NOT_FOUND)
    }
    if (changes.uniqueName) {
        if (changes.uniqueName != currentAttribute.uniqueName) {
            await verifyUniqueName(uniqueName)
        }
    }
    return await attributeModel.findByIdAndUpdate(id, changes, { new: true })
}

const deleteAttribute = async (id) => {
    const result = await attributeModel.findByIdAndDelete(id)
    if (!result) {
        throw ApiError(ErrorCode.NOT_FOUND)
    }
    return result
}

const verifyUniqueName = async (uniqueName) => {
    if (await attributeModel.find({ uniqueName })) {
        throw ApiError(ErrorCode.BAD_REQUEST, 'There is already an attribute with this unique name')
    }
}

module.exports = {
    getAttributes,
    getAttribute,
    createAttribute,
    updateAttribute,
    deleteAttribute
}