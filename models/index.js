const models = {
    usersModel: require ('./nosql/users').usersModel,
    charactersModel: require ('./nosql/characters'),
    formsModel: require ('./nosql/forms'),
    powersModel: require ('./nosql/powers'),
    characterSheets: require('./nosql/characterSheets'),
    characterFormSheets: require('./nosql/characterFormSheet')
}

module.exports = models