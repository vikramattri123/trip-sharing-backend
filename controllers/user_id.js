const HttpError = require("../models/HttpError");
const mongoose = require("mongoose");
const {validationResult} = require('express-validator');
const User_Model = require("../models/User");
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { json } = require("body-parser");
const { create } = require("../models/User");


const SignUpUser = async(req,res,next) =>
{
  console.log(req.body);
      const error = validationResult(req);
      if(!error.isEmpty())
      {
        return next(new HttpError("Please Fill the Provided Field's To SignUp !",502));
      }

      const {name,email,password,image,placeId} = req.body;

      let ExistedMail;
      let ExistedName;
   let encrypt_password = await bcryptjs.hash(password,12);
  try
  {
    ExistedMail = await User_Model.findOne({email:email});
    ExistedName = await User_Model.findOne({name:name});
    console.log(ExistedMail);
  }
  catch(err)
  {
   return next(new HttpError('Signup Failed !',404));
  }


  if(ExistedMail)
  {
    return next(new HttpError('User with this mail already existed !',400));
  }
  if(ExistedName)
  {
    return next(new HttpError('User with this username already existed Use Another!',400));
  }

      const Store_Result = new User_Model({
   name,
   email,
   password:encrypt_password,
   image:image,
   place:[],
   likedpost:[]
      });
    //   console.log(Store_Result);
   let  create_token;
      try
      {
      Store_Result.save();
      create_token = jsonwebtoken.sign({email:Store_Result.email,userid:Store_Result.id},'authenticate_new_user',{expiresIn:'2h'});
      }
      catch(err)
      {
        return next(new HttpError('creating use failed !',422));
      }
   res.json({userid:Store_Result.id,image:Store_Result.image,email:Store_Result.email,username:Store_Result.name,token:create_token});
}

const LoginUser =async(req,res,next) =>
{
  const {email ,password}  =  req.body;
  console.log(email);

    let VerifyUser;
    try{
       VerifyUser = await User_Model.findOne({email:email});
       console.log(VerifyUser.password);
    }
    catch(e)
    {
       return next(new HttpError('No User exist with this mail!'));
    }

    if(!VerifyUser)
    {
       return next(new HttpError('User Not Exist , Try Again'));
    }

    let Verify_Password = await bcryptjs.compare(password,VerifyUser.password);

    if(!Verify_Password)
    {
      return next(new HttpError("User Password Incorrect !"));
    }
    create_token = jsonwebtoken.sign({email:VerifyUser.email,userid:VerifyUser.id},'authenticate_new_user',{expiresIn:'2h'});
    res.json({userid:VerifyUser.id,email:VerifyUser.email,image:VerifyUser.image,username:VerifyUser.name,token:create_token});
}

const getAllPost= (req,res,next) =>
{ 
     
}

const AddFollower  = (req,res) =>
{

  const {userid,follwerid} = req.body;
  try{
    if(req.userData.userId === req.userid)
    {
        
    }
    else{

    }
  }
  catch(e)
  {

  }
    
    
}

const ChangePassword = async(req,res,next) =>
{
  console.log("hello");
    const email = req.params.userid;

    const{Newpassword,password} = req.body;
    console.log("new password",Newpassword);

     if(!email)
     {
       return next(new HttpError("No Email Found",402));
     }
     
    let Find_User_ID;
     try
     {
     Find_User_ID = await User_Model.findOne({email:email});
     console.log("This is the curre",Find_User_ID);

     const Password_Match = await bcryptjs.compare(password,Find_User_ID.password);
     console.log("this is",Password_Match)

     const Set_new_pass = await bcryptjs.compare(Newpassword,Find_User_ID.password);
     console.log("this is",Set_new_pass);
     if(!Find_User_ID)
     {
       return next(new HttpError("No User Found with this Mail !",402));
     }
     else if(!Password_Match)
     {
       return next(new HttpError("Password not matched, write your old password again",402))
     }
     else if(Set_new_pass)
     {
       return next(new HttpError("You cannot use old password",402));
     }
     else
     {
      console.log("here reached");
     let generate_password = await bcryptjs.hash(Newpassword,12);
      Find_User_ID.password = generate_password;
      await Find_User_ID.save();
      console.log("Password Updated!;");
      res.json({message : "Password Changed Successfully"});
     }
      // return next(new HttpError("Password Updated Successfully !",200));
    }
    catch(e)
    {
      return next(new HttpError("Error Occur while Updating Password",501));
    }

}

module.exports = {SignUpUser,LoginUser,getAllPost,AddFollower,ChangePassword}; 