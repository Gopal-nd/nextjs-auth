import mongoose from 'mongoose'

const userSchemea = new mongoose.Schema({
  username:{
    type: String,
    required:[true,"Please Provide a email"],
    unique : true
  },
  email:{
    type:String,
    required:[true,"Please provide a email"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please Provide a Password"]
  },
  isVerfied:{
    type:Boolean,
    default:false,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken:String,
  verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model('User',userSchemea)

export default User;