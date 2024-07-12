class errorhandler extends Error{  // ye isliye bnaye taaki port number bhi chnage kr ske i.e statuscode
constructor(message,statuscode){
    super(message);
    this.statuscode=statuscode;
}
}
export const errormiddleware=(err,req,res,next)=>{
    err.message=err.message || "task not found" 
    err.statuscode=err.statuscodee || 500 
    return res.status(err.statuscode).json({
        success: false,
        message: err.message,
    });
}

export default errorhandler;