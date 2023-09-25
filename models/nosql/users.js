const mongoose = require('mongoose')

const UserType = {
    ADMIN: {
        name: 'admin'
    },
    PLAYER: {
        name: 'player'
    }
}

const userTypeNames = Object.keys(UserType).map(userType => UserType[userType].name)

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        username: {
            type: String
        },
        photo: {
            type: String
        },
        bithdate: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        roles: {
            type: userTypeNames,
            default: [UserType.PLAYER.name]
        }
    },
    {
        timestamps: true, //TODO cratedAt, updatedAt
        versionKey: false
    }
)

module.exports = {
    usersModel: mongoose.model('users', UserScheme),
    UserType
}