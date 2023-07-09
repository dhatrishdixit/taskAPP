import express from "express";
import userRouter from "./routes/users.js";
import { config } from "dotenv";
config({
    path:"./data/config.env"
});
export const app = express();


app.use(express.json());
app.use("/users",userRouter);


app.get("/",(req,res)=>{
    res.send("server working ");
})


