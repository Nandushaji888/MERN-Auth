import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

const User = mongoose.model('User',userSchema)
export{User}