const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    goals:{
        type:Array,
        default:[]
    }
})
mongoose.model("User",userSchema)