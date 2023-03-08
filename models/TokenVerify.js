const jwt = require("jsonwebtoken");
const HttpError = require("./HttpError");

const CheckToken = (req,res,next) =>
{
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token_id = req.headers.authorization.split(' ')[1];
        console.log("token_id",token_id);
        if(!token_id)
        {
            return next(new HttpError('Authentication Failed',402));
        }
        const decodeToken = jwt.verify(token_id,'authenticate_new_user');
        req.userData = {userId : decodeToken.userid};
        next();
    }
    catch(e)
    {
    const error  = new HttpError("Authentication Failed!",401);
    return next(error);
    }
      


}
module.exports = CheckToken;