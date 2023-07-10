const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    handprint:{
        type:Array,
        default:[]
    },
    goals:{
        type:Array,
        default:[]
    }
})
mongoose.model("User",userSchema)