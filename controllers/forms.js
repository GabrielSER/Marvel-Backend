const { formsModel } = require('../models')
const { ErrorCode, handleHttpError } = require('../utils/apiError')
const { matchedData } = require('express-validator')

/**
 * Obtener lista de la base de datos
 */
const getForms = async () =>
  await formsModel.find({})

/**
 * Obtener un detalle
 */
const getForm = async (id) =>
  await formsModel.findById(id)

/** 
 * Insertar un registro
 */
const createForm = async (Form) =>
  await formsModel.create(Form)

/**
 * Actualizar un registro
 */
const updateForm = async (id, changes) => {
  const result = await formsModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}


/**
 * Eliminar un registro
 */
const deleteForm = async (id) => {
  const result = await formsModel.findByIdAndDelete(id)
  // console.log(result)
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

module.exports = {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm
}