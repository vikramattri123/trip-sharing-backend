// const http = require('http');

// const data = http.createServer((req,res) =>
// {
//     // if(req.method === "GET")
//     // {
//     //     console.log("hello");
//     // }
//     // else if(req.method === "POST")
//     // {
//     //     res.json("hello second line");
//     // }
//     let chunk;
//     req.on('data',(data)=>
//     {
//      chunk+=data;
//     });
//     req.on('end',()=>
//     {
//         console.log('done');
//     });
// })
// data.listen(5300,() =>
// {
//     console.log("server running on port no 5300")
// });


const MongoClient = require('mongodb').MongoClient;

// const MongoClient = new mongodb.MongoClient;

const client = new MongoClient("mongodb+srv://User_1999:Vikram1999@cluster123.9amvr1d.mongodb.net/Products_List?retryWrites=true&w=majority");


client.connect().then((client) =>
{
    const collection = client.db('Products_List').collection('test22');
    collection.insertOne({name:"vikram singh"});
    // console.log("connected successfully ",collection);
    console.log("connected");
}).catch((e) =>
{
    console.log("error occur");
});
// client.connect((err,client) =>{

//     // if (err) console.log(err);
//     const collection = client.db('Products_List').collection('test22');
//     collection.insertOne({name:"vikram singh"});
//     console.log("connected successfully ",collection);
//     client.close();
// })



