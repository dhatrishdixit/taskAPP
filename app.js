import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
config({
    path:"./data/config.env"
});
export const app = express();

//using middlewares
app.use(cookieParser());
app.use(express.json());

//using router
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.use(errorMiddleWare);

app.get("/",(req,res)=>{
    res.send("server working ");
})


