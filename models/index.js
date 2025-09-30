const { usersModel } = require('./nosql/users')
const { charactersModel } = require('./nosql/characters')
const { formsModel } = require('./nosql/forms')
const { powersModel } = require('./nosql/powers')
const { attributeModel } = require('./nosql/attributes')
const { attributeValuesModel, attributeStacksModel } = require('./nosql/attributeStacks')
const { userCharactersModel } = require('./nosql/userCharacter')

module.exports = {
    usersModel,
    charactersModel,
    formsModel,
    powersModel,
    attributeModel,
    userCharactersModel,
    attributeValuesModel,
    attributeStacksModel
}