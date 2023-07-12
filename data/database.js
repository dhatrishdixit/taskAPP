import mongoose from "mongoose";

export const connectDB = () => {
    
mongoose.connect(process.env.MONGO_URI,{
    dbName:"ToDo"
}).then((c)=>{console.log(`db is connected to ${c.connection.host}`);}).catch(e=> console.log(e))

}