const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    footprint:{
        type:Array,
        default:[0]
    },
    handprint:{
        type:Array,
        default:[0]
    },
    goals:{
        type:Array,
        default:[]
    }
})
mongoose.model("User",userSchema)