const { charactersModel } = require('../models')
const { ErrorCode, handleHttpError } = require('../utils/apiError')
const { matchedData } = require('express-validator')

/**
 * Obtener lista de la base de datos
 */
const getCharacters = async () =>
  await charactersModel.find({})

/**
 * Obtener un detalle
 */
const getCharacter = async (id) =>
  await charactersModel.findById(id)

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
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
}