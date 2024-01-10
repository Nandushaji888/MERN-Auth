import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
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
    }
})

const Admin = mongoose.model('Admin',adminSchema)
export{Admin}