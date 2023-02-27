
const { usersModel } = require('../models')
const { ErrorCode, ApiError } = require('../common/apiError')
const { hashPassword, validatePassword } = require('../common/bcryptUtil')
const { generateToken } = require('../common/jwtUtil')

const userProjection = { password: 0 }

const upsertUser = async (id, changes) => {
  if (changes.password) {
    changes.password = await hashPassword(changes.password)
  }

  const {
    name,
    photo,
    bithdate,
    email,
    password
  } = changes

  const changesToUpdate = {}
  if (name) changesToUpdate.name = name
  if (photo) changesToUpdate.photo = photo
  if (bithdate) changesToUpdate.bithdate = bithdate
  if (email) changesToUpdate.email = email
  if (password) changesToUpdate.password = password

  if (id === undefined) {
    const createdUser = await usersModel.create(changesToUpdate)
    return await getUser(createdUser._id)
  }
  
  return await usersModel.findByIdAndUpdate(
    id,
    changesToUpdate,
    {
      new: true,
      projection: userProjection
    }
  )
}

const getUsers = async () =>
  await usersModel.find({}, userProjection)

const getUser = async (id) =>
  await usersModel.findById(id, userProjection)

const registerUser = async (user) =>
  await upsertUser(undefined, user)

const generateUserToken = async (userDetails) => {
  const { email, password } = userDetails
  if (!email || !password) {
    throw new ApiError(ErrorCode.BAD_REQUEST, 'email and password are required')
  }

  // Get user by email
  const user = await usersModel.findOne({ email })
  if (!user) {
    throw new ApiError(ErrorCode.NOT_FOUND, `The user with the email ${email} was not found`)
  }

  // Validate password
  const validPassword = await validatePassword(password, user.password)
  if (!validPassword) {
    throw new ApiError(ErrorCode.FORBIDDEN, 'Invalid username or password')
  }
  // Generate JWT
  const tokenBody = {
    id: user._id,
    roles: user.roles
  }
  return {
    token: generateToken(tokenBody)
  }
}

const updateUser = async (id, changes) => {
  const result = await upsertUser(id, changes)
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

const deleteUser = async (id) => {
  const result = await usersModel.findByIdAndDelete(id, { projection: userProjection })
  if (!result) {
    throw new ApiError(ErrorCode.NOT_FOUND)
  }
  return result
}

module.exports = {
  getUsers,
  getUser,
  registerUser,
  generateUserToken,
  updateUser,
  deleteUser
}