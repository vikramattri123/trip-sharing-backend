const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
type:String,
required:true
    },
    address:{
        type:String,
        required:true
        },
        image:{
            type:String,
        required:true
        },
    userid:
    {
        type:mongoose.Types.ObjectId,require:true,ref:'Users'
    },
    username:
    {
        type:String,
        required:true
    },
    TotalLikes:
    {
        type:Number,
        required:true,
    }
    ,userlikedpost:
    [
        {
            type:mongoose.Types.ObjectId,require:true
        }
    ]
});

const ProductModel = mongoose.model('Product',ProductSchema);

module.exports = ProductModel;