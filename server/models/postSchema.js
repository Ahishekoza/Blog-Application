import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    blogPost:{
        type:String,
        default:'',
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        default:[],
        required:false
    }
},
{timestamps: true})

export default mongoose.model('posts', postSchema)