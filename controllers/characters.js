const { charactersModel } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

const getCharacters = async () =>
  await charactersModel.find({})

const getCharacter = async (id) => {
  const result = await charactersModel.findById(id)
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

const createCharacter = async (character) =>
  await charactersModel.create(character)

const updateCharacter = async (id, changes) => {
  const result = await charactersModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

const deleteCharacter = async (id) => {
  const result = await charactersModel.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

module.exports = {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
}