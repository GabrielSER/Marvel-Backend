const { charactersModel } = require('../models')
const { ErrorCode } = require('../common/apiError')
const characters = require('../assets/characters.json')

const batchInsert = async (charactersToCreate) => {
  const charactersArray = charactersToCreate ?? characters
  for (let index = 0; index < characters.length; index++) {
    const characterFromFile = characters[index]
    const character = {
      ...characterFromFile
    }
    const created = await createCharacter(character)
    console.log(`Created character ${created._id}: ${created.name}...`)
  }
}

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
    throw ApiError(ErrorCode.NOT_FOUND)
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
    throw ApiError(ErrorCode.NOT_FOUND)
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
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

module.exports = {
  batchInsert,
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
}