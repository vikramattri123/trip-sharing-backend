const mongoose = require("mongoose");


const {validationResult} = require('express-validator');

const ProductModel =  require('../models/Product');
const HttpError = require("../models/HttpError");
const User_Model = require("../models/User");
const { populate } = require("../models/User");

// const API_Key = "mongodb+srv://User_1999:Vikram1999@cluster123.9amvr1d.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://User_1999:Vikram1999@cluster123.9amvr1d.mongodb.net/Products_List?retryWrites=true&w=majority").then((res) =>
{
    console.log('Connection Established!');
}).catch((e)=>{
    console.log("Not connected")
});

const Dummy_Data = [
    {

        uid:'12345',
        name:'Tesla',
        model:'Model X',
        specification:{
            color:'red',
            year:'2020'
        },
        place:'California'
    }
    , {
        uid:'12345',
        name:'Tesla',
        model:'Model X',
        specification:{
            color:'red',
            year:'2020'
        },
        place:'Punjab'
    }
]

const getAllpost = async(req,res,next) =>
{
      const user_id= req.params.uid;
      console.log(user_id);
      console.log(typeof user_id);

      if(!user_id ||user_id.length === 0)
        {
         return next(new HttpError('please pass id as props to search','404' ));
        }
        //  let Get_All_Post;
         let Get_All_Post;
        try
        {
            // Get_All_Post = await ProductModel.find({userid:user_id}).pop;
            Get_All_Post =  await User_Model.findById(user_id).populate('place');
            console.log(Get_All_Post);
        //    console.log("user id image"+Get_All_Post.userid.image);
            // console.log("here"+Get_All_Post);
        }
        catch(err)
        {
            return next(new HttpError('This User Id Not exist',422));
        }

        if(!Get_All_Post || Get_All_Post.length === 0)
        {
            return next(new HttpError('This User Id Not exist',500));
        }
        // console.log(Get_All_Post.id+ " to this one " + user_id);
        res.json({places: {
        username:Get_All_Post.name,
        userid:user_id,
        image:Get_All_Post.image,
        TotalLikes:Get_All_Post.place.TotalLikes,
       place:Get_All_Post.place.map((place) => place.toObject({getters:true}))
        }});

//     const place = req.params.pid;
//     const find_car = Dummy_Data.find((val) => val.place === place);

//     if(!find_car)
//     {
//     //    const error  = new Error('No car Available at this Location!');;
//     // //    error.code = 404;
//     //    throw error;

//    return next( new HttpError('No car Available at this Location Sir!',404));
//     }
//     res.json({message : find_car.place + ' location car is avaible '});
}


const getAllUserPost = async(req,res,next) =>
{
    let Get_All_Post;

   
    // ProductModel.find().then((data) =>
    // {
    //     Get_All_Post = data;
    //     console.log(Get_All_Post);
    //     return Get_All_Post;
    // }).catch
    // {
    //     return next(new HttpError('Error Occured No Post Avaiable!',402));
    // }
    // res.json({place:Get_All_Post.map((val) => val.toObject({getters:true}))})
    try
        {
            Get_All_Post= await ProductModel.find();
            console.log("data",Get_All_Post);
           
        }
        catch(e)
        {
            return next(new HttpError('Error Occured No Post Avaiable!',402)) 
        }
        res.json({place:Get_All_Post.map((val) => val.toObject({getters:true}))});
}
const Post_New_Post = async(req,res,next) =>
{

    const error = validationResult(req);

    if(!error.isEmpty())
    {
     return next(new HttpError('Invalid input passed,please check data ',422));
    }

console.log(req.body);
 const {address ,userid,title ,description,image,username, TotalLikes} = req.body;

    const create_post = {
        title,
        description,
        address,
        image,
        userid,
        username,
        TotalLikes,
        userlikedpost:[]
    }

    const POST_DATA = new ProductModel(create_post);
    console.log("this is the model",POST_DATA);
    let CheckId;
    try{
        CheckId = await User_Model.findById(userid);
    }
    catch(e)
    {
        return next(new HttpError('Search Failed try Again!',404));
    }
 if(!CheckId)
 {
    
    return next(new HttpError('Email id not exist , please register yourself first!',404));
 }
 try
 {
    // const scss = await mongoose.startSession();
    // scss.startTransaction(); 
    await POST_DATA.save();
 CheckId.place.push(POST_DATA);
    await CheckId.save();
    // scss.commitTransaction()
 }
 catch{
      return next(new HttpError('Data Uploading failed , please retry Again!',500));
 }

 res.json('Data Stored Successfully!');
   

    /* Make Post request using Mongo DB */
    // // const client = new MongoClient(API_Key);
    // const client = new MongoClient(url);
    // try{
    //   await client.connect();
    //   const db = client.db();
    //   const result = db.collection('Products_List').insertOne(create_post);
    //   res.json(result);
    // }
    // catch(err){
    //  return res.json({message :err.message});
    // }
    
    // client.close();


    // if(!req.body)
    // {
    //     throw new HttpError('Please check your Data!');
    // }
    // const {model ,uid,name ,specification,place} = req.body;
    // const create_post = {
    //     uid,
    //     model,
    //     name,
    //     specification,
    //     place
    // }
    // Dummy_Data.push(create_post);
    // res.json(Dummy_Data);
}

const Update_Post = (req,res,error) =>
{
  const uid = req.params.uid;
  const Find_Post = {...Dummy_Data.find((val) => val.uid === uid)};

  if(!Find_Post)
  {
     return next(new HttpError('User Id not Exist' ,404)); 
  }
   
  const FindPost_Index = Dummy_Data.findIndex((val) => val.uid === uid);
  Find_Post.name = 'Skoda';
  Find_Post.model = 'skoda rapid 300';
  Dummy_Data[FindPost_Index] = Find_Post;



  res.json(Dummy_Data);




}


const LikedPost = async(req,res,next) =>
{
    const pid = req.params.postid;

    const {TotalLikes} = req.body;
    console.log("currentlike",TotalLikes);

    console.log("data sharing happen",req.userData.userId);

    let FindPost;
  try{
    FindPost = await ProductModel.findById(pid);
    FindUser = await User_Model.findById(req.userData.userId);
    // User  = await User_Model.findById(userid)
  }

  catch{
     return next(new HttpError("Some Error Occur while liking the Post!",404));
  }

  if(!FindPost)
  {
      return next(new HttpError("Please select the post Again",404));
  }
  try
  {
     if(TotalLikes >= FindPost.TotalLikes)
     {
         console.log("this user 2");
         const Get_POST_Data = FindPost.userlikedpost.toObject({getters:true});
         console.log("data value",Get_POST_Data);
         let count =0;
    FindPost.userlikedpost.map(async(val) => 
    {
        console.log(val);
      if(val ===  req.userData.userId )
      {
        count++;
        return;
      }
      
    })
    if(count < 1)
    {
        FindPost.TotalLikes = TotalLikes;
        console.log("this user 3");
        FindPost.userlikedpost.push(req.userData.userId);
        
        console.log("this user 5");
        FindUser.likedpost.push(FindPost);
        await FindUser.save();
        await FindPost.save();
        return;
    }
     
    //  console.log("excetuted");
    //  
     }
     else
     {      
     FindPost.TotalLikes = TotalLikes;
     console.log("this user 3");
     FindPost.userlikedpost.pull(req.userData.userId);
     await FindPost.save();
     FindUser.likedpost.pull(FindPost);
     await FindUser.save();
     return;
     }
     console.log("this user",User);
     console.log(FindPost);
  }
  catch
  {
     return next(new HttpError("Some Error occured while Liking the Post",404));
  }

    // FindPost.TotalLikes = TotalLikes;
    // if(TotalLikes > FindPost.TotalLikes)
    // {
    //     if(FindPost.userlikedpost.length === 0)
    //     {
    //         console.log("you clicke me");
    //         console.log("here");
    //         FindPost.TotalLikes = TotalLikes;
    //         FindPost.TotalLikes.userlikedpost.push(userid);
    //         User.likedpost.push(pid);
    //         await FindPost.save();
    //         await User.save();
    //         return ;
    //     }
    //     // console.log("Im second 'here");

    //     const Get_POST_Data = FindPost.userlikedpost.toObject({getters:true});
    //     Get_POST_Data.map(async(val) => 
    //     {
    //         console.log(val);
    //         const currentid = val.toObject({getters:true})
    //         console.log("this is my id",currentid);
    //         // console.log("Im'here");
    //         if(currentid!= userid)
    //         {
    //             console.log("not matched");
    //             FindPost.TotalLikes = TotalLikes;
    //             FindPost.userlikedpost.push(userid);
    //             User.likedpost.push(pid);
    //             return {FindPost,User}
    //         }
    //     })
    // }
//     else
//     {
        
//         // console.log("Im second 'here");
//         const Get_POST_Data = FindPost.userlikedpost.map((val) => toObject({getters:true}));
//         Get_POST_Data.map(async(val) => 
//         {
//             // console.log(val.id);
//             const currentid = val.id;
//             // console.log("Im second 'here");
//             console.log("this is my id",currentid.toString());
//             if(currentid === userid)
//             {
//                 console.log("matched");
//                 FindPost.TotalLikes = TotalLikes;
//                 FindPost.userlikedpost.pull(userid);
//                 User.likedpost.pull(pid);
//                return {FindPost,User}
//             }
          
//         })
//     }
//     await FindPost.save();
//     await User.save();
//     // FindPost.userliked.likedpost.push(pid);
  
//   }
//   catch(e)
//   {
//     return next (new HttpError('Post Likes not updated !',403));
//   }
    
//       res.json(FindPost);
//     console.log(FindPost);

}


exports.getAllpost = getAllpost;

exports.New_Post= Post_New_Post;

exports.Update_Post = Update_Post;

exports.getAllUserPost = getAllUserPost;

exports.LikedPost = LikedPost