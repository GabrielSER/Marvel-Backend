const { powersModel } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

/**
 * Obtener lista de la base de datos
 */
const getPowers = async () =>
  await powersModel.find({})

/**
 * Obtener un detalle
 */
const getPower = async (id) => 
  await powersModel.findById(id)

/** 
 * Insertar un registro
 */
const createPower = async (power) =>
  await powersModel.create(power)

/**
 * Actualizar un registro
 */
const updatePower = async (id, changes) => {
  const result = await powersModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}


/**
 * Eliminar un registro
 */
const deletePower = async (id) => {
  const result = await powersModel.findByIdAndDelete(id)
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

module.exports = {
  getPowers,
  getPower,
  createPower,
  updatePower,
  deletePower
}