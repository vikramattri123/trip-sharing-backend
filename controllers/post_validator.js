const  {check}= require('express-validator');



const ValidateInputs = (req,res,next) =>
{
    
    next();
}

module.exports = ValidateInputs;