import { Task } from "../models/task.js";

export const newPost = async (req,res,next)  => {
   try{   const {title,description} = req.body;
   
   await Task.create({
       title,
       description,
       user:req.user,
   })
   
   res.status(201).json({
    success:true,
    message:"task created successfully",
   })
}catch(err){
     next(err);
}

}

export const getMyTask = async (req,res,next) => {
   try{const userId = req.user._id ;
    const task = await Task.find({
        user:userId,
    });
    // console.log(task);
    res.status(201).json({
        success:true,
        task,
    });} 
    catch(err){
        next(err);
    }

}

export const updateTask = async (req,res,next) => {
   try{const task = await Task.findById(req.params.id);
//check error handler middle ware 
//    if(!task)  return next(new ErrorHandler("invalid task",404))
    if(!task){
        return res.status(404).json({
            success:false,
            message:"task doesn't exist"
        })
    }
 
    // console.log(task);
    task.isCompleted = !task.isCompleted;

    await task.save();
     res.status(201).json({
        success:true,
        message:"task updated"
    });} 
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }

}

export const deleteTask = async (req,res,next) => {
    try{    const task = await Task.findById(req.params.id);

    if(!task){
        return res.status(404).json({
            success:false,
            message:"task doesnt exist"
        })
    }
 
    await task.deleteOne();            
    res.status(201).json({
        success:true,
        message:"task is deleted",
    });
}
catch(err){
    res.status(500).json({
        success:false,
        message:"internal server error"
    })
}
}
