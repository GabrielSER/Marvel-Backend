const { charactersModel, powersModel } = require('../models')
const { ObjectId } = require('mongoose').Types
const { ApiError, ErrorCode } = require('../common/apiError')
/*
const batchInsert = async () => {

  for (let index = 0; index < powers.length; index++) {
    const power = powers[index]
    power._id = new ObjectId(power._id)
    const created = await powersModel.create(power)
    console.log(`Created power ${power.name}`)
  }

  for (let index = 0; index < charactersArray.length; index++) {
    const characterToCreate = charactersArray[index]
    const types = characterToCreate.types
    delete characterToCreate.types
    const character = {
      ...characterToCreate,
      _id: new ObjectId(characterToCreate._id),
      types,
      order: index
    }
    const created = await charactersModel.create(character)
    console.log(`Created character ${created._id}: ${created.name}...`)
  }
}*/

/**
 * Obtener lista de la base de datos
 */
const getCharacters = async () =>
  await charactersModel.find({})

/**
 * Obtener un detalle
 */
const getCharacter = async (id) => {
  const result = await charactersModel.findById(id)
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

/** 
 * Insertar un registro
 */
const createCharacter = async (character) =>
  await charactersModel.create(character)

/**
 * Actualizar un registro
 */
const updateCharacter = async (id, changes) => {
  const result = await charactersModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}


/**
 * Eliminar un registro
 */
const deleteCharacter = async (id) => {
  const result = await charactersModel.findByIdAndDelete(id)
  // console.log(result)
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