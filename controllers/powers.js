const { powersModel } = require('../models')
const { ApiError, ErrorCode } = require('../common/apiError')

const getPowers = async () =>
  await powersModel.find({})

const getPower = async (id) => 
  await powersModel.findById(id)

const createPower = async (power) =>
  await powersModel.create(power)

const updatePower = async (id, changes) => {
  const result = await powersModel.findByIdAndUpdate(id, changes, { new: true })
  if (!result) {
    throw ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

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