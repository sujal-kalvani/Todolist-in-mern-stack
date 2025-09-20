const mongoose=require("mongoose")

async function connectDB()
{
    try {
        await mongoose.connect(process.env.mongoUrl)
    } catch (error) {
        console.log(error);
    }
}
module.exports=connectDB