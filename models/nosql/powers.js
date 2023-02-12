const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        character:{
            type:Schema.Types.ObjectId,
            ref: "characters"
        }
    },
    {
            
    }
);

module.exports = mongoose.model("powers", PowerScheme)