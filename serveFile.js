var express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/QuestionBank");
app.use(express.urlencoded())
var bodyParser=require('body-parser');
//const url=require("url");
var session=require('express-session');
app.use(express.json());
app.use(express.static('public'));
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));
var flag=0;

app.set('view engine', 'ejs');
//mongoose.connect("mongodb://localhost:27017/ecom",{ useNewUrlParser: true },{ useUnifiedTopology: true } );//connection with database
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connection.on('error', (err) => {
  console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
  console.log('DB connected');
});

mongoose.set('useFindAndModify', false);
var Schema=mongoose.Schema;
var username;
let question=new Schema({
    qid:Number,
    qname:String,
    qdesc:String,
});

let Users=new Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    
});

let Logedinuser=new Schema({
  
    username:String,
    password:String,
   
    
});


var pro = mongoose.model('question',question);
var user = mongoose.model('users', Users);
var logedinuser = mongoose.model('logedinuser', Logedinuser);


app.get("/",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});


app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});

app.get("/signup.html",function(req,res)
       {
    res.sendFile(__dirname+"/signup.html");
});

app.get("/Adminquestion.html",function(req,res)
       {
    res.sendFile(__dirname+"/Adminquestion.html");
});










app.post('/adduser',(req,res)=>{
    var len=JSON.parse(req.body.userList).length;
    var sData=new user();
    sData.name=JSON.parse(req.body.userList)[len-1].name;
    sData.username=JSON.parse(req.body.userList)[len-1].username;
    sData.email=JSON.parse(req.body.userList)[len-1].email;
    sData.password=JSON.parse(req.body.userList)[len-1].password;

    sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/login.html');
 });
})





app.post('/loginarray',(req,res)=>{
  

    var len=JSON.parse(req.body.logarray).length;
    var sData=new logedinuser();
     if(JSON.parse(req.body.logarray)[len-1].username=='chitkara')
     flag=1;

     console.log("login array flag is: "+flag);
    sData.username=JSON.parse(req.body.logarray)[len-1].username;
    
    sData.password=JSON.parse(req.body.logarray)[len-1].password;

    sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/test.html');
 });
})





app.post('/setSession',(req,res)=>{
    
     req.session.username=JSON.parse(req.body.username);
    

    if(req.session.username=='subhapreet'){
        flag=1;
        
    }
    else if(req.session.username=='logout'){
        flag=0;
    }
    else flag=0;
})

app.get('/loginarray',(req,res)=>{
    console.log('running it');
    logedinuser.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });




app.post('/array',(req,res) => {
    console.log("running it");
  var len=JSON.parse(req.body.questionList).length;
     var sData=new pro();
     sData.qid=JSON.parse(req.body.questionList)[len-1].qid+1;
  sData.qname=JSON.parse(req.body.questionList)[len-1].qname;
  sData.qdesc=JSON.parse(req.body.questionList)[len-1].qdesc;
 
 
  sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/Adminquestion.html');
 });        
 });


 app.post('/cartarray',(req,res) => {
  console.log("running it");
  var len=JSON.parse(req.body.productList).length;
     var sData=new cart();
     sData.uid=JSON.parse(req.body.productList)[len-1].uid;
     sData.pid=JSON.parse(req.body.productList)[len-1].pid;
  sData.pname=JSON.parse(req.body.productList)[len-1].pname;
  sData.pdesc=JSON.parse(req.body.productList)[len-1].pdesc;
 
   sData.pquan=JSON.parse(req.body.productList)[len-1].pquan;
     sData.pprice=JSON.parse(req.body.productList)[len-1].pprice;
 
  sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/question.html');

 });    
 });
 

 app.get('/adduser',(req,res)=>{
    console.log('running it');
    user.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });


 app.get('/array',(req,res)=>{
  console.log('running it');
  pro.find({},function(err,docs){
      if(err)
          {
              console.log("error");
          }
      console.log(docs);
      res.send(docs);
     
  });
});

app.get('/cartarray',(req,res)=>{
    console.log('running it');
    cart.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });
  

app.post('/delete',(req,res)=>{

// console.log("Question--------------------: "+JSON.parse(req.body.qname));

  pro.findOneAndRemove({'qname':JSON.parse(req.body.qname)}, function(err){
      if (err){
          throw err;
          
      }
      console.log('deleted');
  });
});

app.post('/cartdelete',(req,res)=>{

    
   var ob=(JSON.parse(req.body.obj));
   console.log(ob.uid+" "+ob.pid);
     cart.findOneAndRemove({'pid':ob.pid , 'uid':ob.uid}, function(err){
         if (err){
             throw err;
             
         }
         console.log('deleted');
     });
   });

   app.post('/emptycart',(req,res)=>{

    
    var ob=(JSON.parse(req.body.username));
    
      cart.remove({'uid':ob}, function(err){
          if (err){
              throw err;
              
          }
          console.log('deleted');
      });
    });

   app.post('/updatequestions',(req,res)=>{

    var len=JSON.parse(req.body.productList).length;
    var arr=JSON.parse(req.body.productList);
    for(var i=0;i<len;i++){

        var myquery = { Prodname: arr[i].Prodname };
        var newvalues = { $set: { Prodid: arr[i].Prodid, Proddesc:arr[i].Proddesc,Prodprice:arr[i].Prodprice,Prodquan:arr[i].Prodquan } };
        pro.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
                else
            console.log("1 document updated");
        
          });
    
    }
   });


app.post('/cartupdate',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.uid);

    var myquery = { pname: ob.pname, uid: ob.uid };
  var newvalues = { $set: { pname: ob.pname, pdesc:ob.pdesc,pprice:ob.pprice,pquan:ob.pquan } };
   
    cart.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});

app.post('/update',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.name);

    var myquery = { qname: ob.qname };
  var newvalues = { $set: { qname: ob.qname, qdesc:ob.qdesc } };
   
    pro.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});
app.get("/question.html",function(req,res)
       {
    res.sendFile(__dirname+"/question.html");
});


app.listen(3000);