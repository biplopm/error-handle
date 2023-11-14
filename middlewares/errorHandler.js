export const errorHandler = (err, req,res, next)=>{
    //Find Status Code
    const status = res.statusCode ? res.statusCode : 500;

    //Send Error Message
    res.status(status).json({message: err.message})
}