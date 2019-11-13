var CartArray=[];
var retrievedArray=[];
var CartId=0;
var userArray=[];
var showListQuotions=document.getElementById("showListQuestions");
var showname=document.getElementById("Show");
var Name=document.getElementById("name");
var Logout=document.getElementById("logout");



function addquestiontoDOM(newObj)
{
  var listdiv1=document.createElement("div");
  listdiv1.setAttribute("id",newObj.Prodid);
  var prodName=newObj.Prodname;
  var prodDesc=newObj.Proddesc;
  var prodprice=newObj.Prodprice;
  var prodquan=newObj.Prodquan;
  var label1=document.createElement("h3");
  var label2=document.createElement("h5");
  var qid=newObj.qid;
  label1.innerHTML=pid+"# Question: "+qName;
  label2.innerHTML="Answer: "+qDesc;
 
  
  var inputQuan=document.createElement("input");
  inputQuan.setAttribute("placeholder","  Enter Quantity");
  inputQuan.setAttribute("type","number");
  inputQuan.setAttribute("style","margin:left:5px; width: 15%; height:5%;  margin-top:8px; margin-left:2px;");
  inputQuan.setAttribute("id","inputQuan");
  if(prodquan<=0)
  inputQuan.setAttribute("disabled","true");

  var addToCart=document.createElement("button");
  addToCart.innerHTML="Add To Cart";
  addToCart.setAttribute("id","addToCart");
  addToCart.setAttribute("style","height:30px; text-transform: initial; background-color: rgb(29, 14, 43);border: white; font-size: 12px; margin-left:10px; color: white; ");

  listdiv1.append(label1);
  listdiv1.append(label2);
  listdiv1.append(label3);
  insertBlankLine(listdiv1);
  if(prodquan<=0)
  {
  listdiv1.append(label4);
  insertBlankLine(listdiv1);
  }
  listdiv1.append(inputQuan);
  listdiv1.append(addToCart);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  showListquestions.appendChild(listdiv1);
/*
addToCart.addEventListener("click",function()
{
  if(userArray.length==0)
  {
    alert("You Need To Login First");
    location.href="login.html";
  }

  else{
    var target=event.target.parentNode;
    var quantity=inputQuan.value;
    if(quantity=="")
    {
      alert("Enter Quantity");
    }
    else
    {
    var flag=validate(retrievedArray[getQuestionIndex(target.id)].Prodquan,quantity);
    if(flag==true)
    {
      var CartObj={
        uid:userArray[userArray.length-1].username,
        pid:newObj.Prodid,
        pname:prodName,
        pdesc:prodDesc,
        pprice:prodprice,
        pquan:quantity
      }
      console.log(CartObj);
      alert("Product Added");
     
    var temp = checkIndex(CartArray,newObj.Prodid,userArray[userArray.length-1].username);
    console.log(userArray);
    if(temp != -1)
    {
      CartArray.splice(temp,1,CartObj);
      console.log(CartArray);
      updateCart(CartObj);
    }
    else if(temp == -1)
    {
      CartArray.push(CartObj);
      CartId++;
      console.log(CartArray);
      storeProducts(CartArray);
    }

    }
}
}
});
*/



/*
function getCartProducts()
{
  // if(!localStorage.cartProduct)
  // {
  //   localStorage.cartProduct=JSON.stringify([]);
  // }
  // else
  // {
  //   CartArray=JSON.parse(localStorage.cartProduct);
  //   console.log(CartArray);
  // }

  console.log("get stored product running");
  

  var xhttp=new XMLHttpRequest();
     
      xhttp.onreadystatechange=()=>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
         
        console.log("response text");
        console.log(xhttp.responseText);
       CartArray= JSON.parse(xhttp.responseText);
     
  
    
         console.log("cart array");
         console.log(CartArray);  
      }
    }
    xhttp.open("GET", "/cartarray", true);
    xhttp.send();  
   
  
       
}
*/




function getStoredQuestions()
{

  console.log("get stored questions running");
  

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
      retrievedArray = JSON.parse(xhttp.responseText);
   

   
    
    console.log(retrievedArray);
    console.log("-----------------------------")

// for(i=0;i<retrievedArray.length;i++)
//   {
//   addProducttoDOM(retrievedArray[i]);
//   }

getDom(retrievedArray,0);
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send();  
 

     
 
}

var start=0;
function next(){
  
  if(start<retrievedArray.length-2)
  {
    start=start+2;
    console.log("start is----"+start);
    showListQuestions.innerHTML="";

  
  getDom(retrievedArray,start);
  }
}

function getDom(retrievedArray,start)
{
  
  for(var i=start;i<start+2;i++)
  {
    if(i<=retrievedArray.length-1)
    addQuestiontoDOM(retrievedArray[i]);
  }
}

function back(){

 if(start>=2)
 { 
   start=start-2;
   showListQuestions.innerHTML="";
   console.log("back start is......."+start);
   backDom(retrievedArray,start);
 }
}

function backDom(retrievedArray,start){
  for(var i=start;i<start+2;i++){

    addQuestiontoDOM(retrievedArray[i]);
  }
}
 


function getSessionQuestions()
{
  // if(sessionStorage.logarray)
  // userArray=JSON.parse(sessionStorage.logarray);
  console.log("login array fetching..........");
  

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text for login array-----------");
      console.log(xhttp.responseText);
      userArray = JSON.parse(xhttp.responseText);
      console.log("{{{{{{{{{{{{{{{{{{{{{{{{{");
   console.log(userArray);

      console.log("::::::::::::::::::::::::::");
  console.log(userArray);
  console.log("-----------------------");

  if(userArray.length!=0)
{
  console.log("loggedin is calling---------");
loggedIn();

}
     
    }
   }

  xhttp.open("GET", "/loginarray", true);
  xhttp.send();  
 

// if(userArray.length==0)
// {
// sessionStorage.logarray=JSON.stringify([]);

// }

}


function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}



function validate(prodquan,enteredquan)
{
  if(enteredquan==""){
  alert("Enter Quantity");
  return false;}
  else if(parseInt(enteredquan)<=0)
  {
    alert("Invalid Quantity");
    return false;
  }
  else if(parseInt(enteredquan)>parseInt(prodquan))
  {
    alert("Quantity Should Be Less Than or Equal To "+prodquan);
    return false;
  }
  return true;
}


function checkIndex(CartArray,id,username)
{
  console.log("username "+username);
  for(var i=0;i<CartArray.length;i++)
  {
    if(CartArray[i].uid==username && CartArray[i].pid == id)
    {
      console.log(CartArray[i].uid+" "+CartArray[i].pid+" "+id)
      return i;
    }
  }
  return -1;
}


function storeQuestions(CartArray)
{
//localStorage.cartProduct=JSON.stringify(CartArray);
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/cartarray", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("QuestionList="+JSON.stringify(CartArray));

}



function check()
{
  /*if(userArray.length==0)
  {
    alert("You must Login first.");
    location.href="login.html";
  }
  else
  {
    if(!checkUser(userArray[userArray.length-1].username))
    {
       alert("Please Select Some Product First !");
    }
    else
    {
  var temp=JSON.parse(localStorage.cartProduct);
    if(temp.length!=0)
    {
      for(var i=0;i<temp.length;i++)
      {
        if(!CartArray.includes(temp[i])){
        CartArray.push(temp[i]);
        console.log(temp[i]);}
      }
    }
    console.log(CartArray);
    storeProducts(CartArray);
    console.log(retrievedArray);*/
    if(CartArray.length==0)
    alert("Cart Is Empty");
    else
    location.href="question.html";
    
 
}


function getQuestionIndex(id)
{
  for(var i=0;i<retrievedArray.length;i++)
  {
    if(retrievedArray[i].Prodid==id)
    return i;
  }
  return 0;
}

var logInArray=[];


function loggedIn()
{
  
 //console.log(userArray);
 //************************************ */
  Name.innerHTML="hello "+ userArray[userArray.length-1].username;
  Name.setAttribute("href","#");
  //************************** */
 

  //***************************************** *
  Logout.innerHTML="Logout";
  




  Logout.addEventListener("click",function(){

setSession("logout");

  
  });
 
}

function setSession(username){

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/setSession", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("username="+JSON.stringify(username));
}


function checkUser(username)
{
  for(var i=0;i<CartArray.length;i++)
  {
    if(CartArray[i].UserId==username)
    {
      return true;
    }
  }
  return false;
}

function updateCart(obj){

  console.log("update cart working");
  console.log(obj);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/cartupdate", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("obj="+JSON.stringify(obj));
}