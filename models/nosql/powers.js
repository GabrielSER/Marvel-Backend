const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PowerScheme = new Schema(
    {
        name:{
            type:String
        },
        level:{
            type:Number
        },
        bonusDamage:{
            type:String,
        },
        type:{
            type:String
        },
        skillCheck:{
            type:String
        },
        description:{
            type:String
        },
        module:{
            type:String
        },
        character:{
            type:String
        },
        form:{
            type:String
        }
    },
    {
            
    }
)

module.exports = mongoose.model('powers', PowerScheme)