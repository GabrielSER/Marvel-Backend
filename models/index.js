const models = {
    usersModel: require ('./nosql/users').usersModel,
    charactersModel: require ('./nosql/characters'),
    formsModel: require ('./nosql/forms'),
    powersModel: require ('./nosql/powers')
}

module.exports = models