const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const UserSchema = mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    place:[{ type:mongoose.Types.ObjectId,require:true,ref:'Product'}],
    likedpost : [{ type:mongoose.Types.ObjectId,require:true,ref:'Product'}],
    followers:[{ type:mongoose.Types.ObjectId,require:true}],
    following:[{ type:mongoose.Types.ObjectId,require:true}]
})
UserSchema.plugin(validator);
const User_Model = mongoose.model('Users',UserSchema);
// mongoose.connect('mongodb+srv://User_1999:Vikram1999@cluster123.9amvr1d.mongodb.net/RegisteredUser?retryWrites=true&w=majority')


module.exports = User_Model;