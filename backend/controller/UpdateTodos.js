const todoModel=require("../models/Todo")

async function updateController(req,res)
{
   
    try {
        const {id}=req.params
        // console.log(id);
        
        const {title}=req.body
        // console.log(title);
        
        const updatedTitle=await todoModel.findByIdAndUpdate(
            id,
            {title},
            {new:true}
        )

        if(updatedTitle)
        {
            res.status(201).json({message:"Tiltle updated successfully"})
        }
        else
        {
            res.status(404).json({message:"Title not updated"})
        }

    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports=updateController