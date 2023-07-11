import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server  is working in PORT: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`);
})