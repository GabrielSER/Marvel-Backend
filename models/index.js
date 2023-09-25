module.exports = {
    usersModel: require ('./nosql/users').usersModel,
    charactersModel: require ('./nosql/characters'),
    formsModel: require ('./nosql/forms'),
    powersModel: require ('./nosql/powers'),
    attributeModel: require('./nosql/attributes').attributeModel,
    attributeValueModel: require('./nosql/attributeValues')
}