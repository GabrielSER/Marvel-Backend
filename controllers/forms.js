const { formsModel } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

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
 * Actualizar un registro
 */
const addAttribute = async (attribute) => {
  const { 
    uniqueName,
    name,
    value = 1,
    type = AttributeType.SKILL
  } = attribute
  if(!uniqueName)
  {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  if(!name)
  {
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


/**
 * Eliminar un registro
 */
const deleteForm = async (id) => {
  const result = await formsModel.findByIdAndDelete(id)
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