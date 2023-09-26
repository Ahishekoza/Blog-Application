import categorySchema from "../models/categorySchema.js";

export const createCategory = async(req,res) =>{
    const existingcategory = await categorySchema.find({name:req.body.name})
    console.log(existingcategory);
    if(existingcategory.length>0){
        //  409 status code is used to indicate that category already exists
        return res.status(409).json({
            message:'Category already exists'
        })
    }
 
        await categorySchema.create({name:req.body.name})
        .then((response)=>{
            return res.status(201).json({
                message:'Category Created',
                category: response
            })
        })
        .catch((err)=>{
            return res.status(500).json({
                message:`Error creating category ${err.message}`
            })
        })
    
}


export const getAllCategories = async(req,res)=>{
    await categorySchema.find().then((response)=>{
        res.status(200).json({
            message:'Recieved categories successfully',
            categories:response
        })
    }).catch((err)=>{
        res.status(404).json({
            message:'Categories Not Found'
        })
    })
}