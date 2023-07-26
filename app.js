import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";
config({
    path:"./data/config.env"
});
export const app = express();

//using middlewares
app.use(cookieParser());
app.use(express.json());
// arrays are used in key value pair in cors to pass multiple values


app.use(
    cors({
      // origin: [process.env.FRONTEND_URL],
      origin:"*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

//using router
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);


app.use(errorMiddleWare);

app.get("/",(req,res)=>{
    res.send("server working ");
})


