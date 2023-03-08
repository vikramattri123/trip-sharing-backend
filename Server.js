const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const place_routes = require('./routes/place_id_routes');
const user_routes = require('./routes/user_id_routes');

app.use(bodyparser.json());

app.use((req,res,next)=>
{
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Headers','*');
   res.setHeader('Access-Control-Allow-Methods','*');
  next();
});

app.use('/place',place_routes);
app.use('/user',user_routes);


app.use((error,req,res,next) => 
{
    res.status(error.code || 500);
    res.json(error.message || 'unknown address request');
})

app.listen(6200,() =>
{
  console.log("Server Running on Port no 6200");
});



  /* Additional Data  */
// app.use(express.static(path.join(__dirname,'public')));

// app.set('view engine',ejs);
// app.set('view',path.join(__dirname,'views'));
// console.log(path.join(__dirname));



// app.use((req,res,next) => {
//   let body='';
//     req.on('end',() =>
//   {
//     const username = body.split('=')[1];
//     if(username)
//     {
//         req.body = {name:username};
//         console.log(username);
//     }
//     next();
//   })
//   req.on('data',(chunk) =>
//   {
//       body+=chunk;

//   })
// })
// app.use((req,res,next)=>
// {
//    if(req.body)
//    {
//      res.send('<h1>' + req.body.name + '</h1>');
//    }
//  res.send('<form method="POST"><input type="text" name="username"/><button type="submit">Click</button></form>');
// });