class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleWare = (err,req,res,next) => {
        
     err.message = err.message || "Internal Server Error" ;
     err.status = err.status || 500 ;

     return res.status(err.status)({
        success:false,
        message:err.message,
     })

}