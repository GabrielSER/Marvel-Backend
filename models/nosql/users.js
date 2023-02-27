const mongoose = require('mongoose')

const USER_TYPE = {
    ADMIN: {
        name: 'admin'
    },
    PLAYER: {
        name: 'player'
    }
}

const userTypeNames = Object.keys(USER_TYPE).map(userType => USER_TYPE[userType].name)

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        username: {
            type: String,
            index: true,
            unique: true
        },
        photo: {
            type: String
        },
        bithdate: {
            type: String
        },
        email: {
            type: String,
            index: true,
            unique: true
        },
        password: {
            type: String
        },
        roles: {
            type: userTypeNames,
            default: [USER_TYPE.PLAYER.name]
        }
    },
    {
        timestamps: true, //TODO cratedAt, updatedAt
        versionKey: false
    }
)

const usersModel = mongoose.model('users', UserScheme)

module.exports = {
    usersModel,
    USER_TYPE
}