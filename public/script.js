var QuestionArray=[];
var qId=0;
var currentId=0;
var temp=1;
var targetParent;
var editParent;
var divAddQuestion = document.getElementById("divAddQuestion");
var divListQuestions = document.getElementById("divListQuestions");
var aAddQuestion = document.getElementById("aAddQuestion");

aAddQuestion.addEventListener("click",function(){
  createNewQuestionPanel();
  aAddQuestion.setAttribute("style","visibility:hidden");
});

function createNewQuestionPanel()
{
  if(temp==1)
  {
  temp=0;

  var h2=document.createElement("h2");
  h2.setAttribute("id","h2");
  h2.innerHTML="Input Details";
  h2.setAttribute("style","text-decoration:underline");
   

  var div1=document.createElement("div");
  div1.setAttribute("id","div1");
  var qName=document.createElement("input");
  qName.setAttribute("id","qName");
  qName.setAttribute("placeholder","Question");
 
  
  div1.appendChild(qName);
  insertBlankLine(div1);
  insertBlankLine(div1);


  var div2=document.createElement("div");
  div2.setAttribute("id","div2");
  var qDesc=document.createElement("textarea");
  qDesc.setAttribute("id","qDesc");
  qDesc.setAttribute("placeholder","Answer");
  qDesc.setAttribute("rows","4");
  qDesc.setAttribute("cols","19");
  div2.appendChild(qDesc);
  insertBlankLine(div2);
  insertBlankLine(div2);



var div5=document.createElement("div");
div5.setAttribute("id","div5");
var submitButton=document.createElement("button");
submitButton.setAttribute("id","submitButton");
submitButton.setAttribute("style","margin-left:5px;");
submitButton.innerHTML="Submit";
//submitButton.setAttribute("style","visibility:hidden");
submitButton.addEventListener("click",function()
{
  var flag=validation();
  if(flag==true){
  addQuestiontoArray();
   }
   else
   alert("All fields are required");
});

var cancelButton=document.createElement("button");
cancelButton.setAttribute("id","cancelButton");
cancelButton.setAttribute("style","margin-left:20px");
cancelButton.innerHTML="Cancel";
cancelButton.addEventListener("click",function(){
removeFields();
});

var saveButton=document.createElement("button");
saveButton.setAttribute("id","saveButton");
saveButton.setAttribute("style","margin-left:20px");
saveButton.setAttribute("style","visibility:hidden");
saveButton.addEventListener("click",function(){
var newObject={
  qid:currentId,
  qname:document.getElementById("qName").value,
  qdesc:document.getElementById("qDesc").value,
}
replaceInArray(newObject);
updateDom(newObject);
clearPannel();
});
saveButton.innerHTML="Save";
div5.append(submitButton);
div5.append(cancelButton);
div5.append(saveButton);

divAddQuestion.append(h2);
divAddQuestion.append(div1);
divAddQuestion.append(div2);
divAddQuestion.append(div5);
}
}

function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}

//******************************validation function*********************************** */
function validation()
{
  var qName=document.getElementById("qName").value;
  var qDesc=document.getElementById("qDesc").value;

  if(qName == ""||qDesc == ""){
  return false;}
  else
  return true;
}

//****************add to Question array function*********************** */
function addQuestiontoArray()
{
  var QuestionObject={
  qid:qId,
  qname:document.getElementById("qName").value,
  qdesc:document.getElementById("qDesc").value,

  }
  QuestionArray.push(QuestionObject);
  storeQuestions(QuestionArray);

 addQuestionucttoDOM(QuestionObject,1);

  clearPannel();
  qId++;
  console.log(JSON.stringify(QuestionArray));
}

//******clear pannel function*************** */
function clearPannel()
{
temp=1;
divAddQuestion.removeChild(h2);
divAddQuestion.removeChild(div1);
divAddQuestion.removeChild(div2);
divAddQuestion.removeChild(div5);
aAddQuestion.setAttribute("style","visibility:visible;inline-size: 200px; margin-left: 40%; background-color: rgb(29, 14, 43);border: white;");
}

//*********add to DOM function******************* */
function addQuestiontoDOM(QuestionObj,flag2)
{
var listdiv1=document.createElement("div");
listdiv1.setAttribute("style","fontsize: 20px;")
var qName=QuestionObj.qname;
var qDesc=QuestionObj.qdesc;
var qid=QuestionObj.qid;
 if(flag2==1)
 qid=qid+1;

var qname=document.createElement("h3");
var qdesc=document.createElement("h5");

qname.innerHTML=qid+". Question: "+qName;
qdesc.innerHTML="Answer: "+qDesc;


var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(qname);

listdiv1.append(qdesc);

insertBlankLine(listdiv1);

listdiv1.append(editButton);
listdiv1.append(deleteButton);



insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListQuestions.append(listdiv1);
console.log(QuestionArray);

editButton.addEventListener("click",function(){
editFunction(qName,qDesc);
});

deleteButton.addEventListener("click",function(){
  
  deleteFunction(QuestionObj);
 // deleteFromDataBase(ProdObj);

});
}

//************removing object from array*************** */
function removeFromQuestionsArray(id)
{
  QuestionArray.splice(id,1);
  console.log(QuestionArray);
 
}

//*******************insert into fields during edit function*********** */

function insertIntoFields(qName,qDesc)
{
  var name=document.getElementById("qName");
  var desc=document.getElementById("qDesc");

  name.value=qName;
  desc.value=qDesc;

}


function updateDom(QuestionObj)
{
 var listdiv1=document.createElement("div");
var qName=QuestionObj.qname;
var qDesc=QuestionObj.qdesc;
var qid=QuestionObj.qid;
//prodid=prodid+1;

var quesname=document.createElement("h3");
var quesdesc=document.createElement("h3");
quesname.innerHTML=qid+"# Question: "+qName;
quesdesc.innerHTML="Answer: "+qDesc;


var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(qname);

listdiv1.append(qdesc);

insertBlankLine(listdiv1);

listdiv1.append(editButton);
listdiv1.append(deleteButton);



insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListQuestions.append(listdiv1);
 editParent.parentNode.replaceChild(listdiv1,editParent);
  editButton.addEventListener("click",function(){
  editFunction(qName,qDesc);
  });
  deleteButton.addEventListener("click",function(){
  deleteFunction(QuestionObj);
  
  });
}


function getQuestionIndex(id)
{
  for (var i = 0; i < QuestionArray.length; i++)
	{
      if (QuestionArray[i].qid == id)
			return i;
  }
}


function replaceInArray(newObj)
{
  for(var i=0;i<QuestionArray.length;i++)
  {
    if(QuestionArray[i].qid==newObj.qid)
    {
      QuestionArray[i]=newObj;
    }
  }
  console.log(QuestionArray);
  
  updateDatabase(newObj);
}

//*********local storage functions**************** */

function storeQuestions(QuestionArray)
{
/*console.log(ProdArray);
localStorage.adminproducts=JSON.stringify(ProdArray);*/

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/array", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("questionList="+JSON.stringify(QuestionArray));
}





function getStoredQuestions()
{

  console.log("get stored Question running");
  

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
      QuestionArray = JSON.parse(xhttp.responseText);
     //console.log(ProdArray);
   // QuestionID = QuestionArray[QuestionArray.length-1].qid;

   
    
    console.log(QuestionArray);
    console.log("-----------------------------")

   // console.log("Question"+QuestionArray[0].qname);
for(i=0;i<QuestionArray.length;i++)
  {
  addQuestiontoDOM(QuestionArray[i],0);
  }
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send();  
 

     
 
}



function editFunction(qName,qDesc,QuestionObj)
{
  editParent=event.target.parentNode;
  createNewQuestionPanel();
  aAddQuestion.setAttribute("style","visibility:hidden");
  document.getElementById("submitButton").setAttribute("style","visibility:hidden");
  document.getElementById("cancelButton").setAttribute("style","visibility:hidden");
  document.getElementById("saveButton").setAttribute("style","visibility:visible");
  insertIntoFields(qName,qDesc);
  currentId=QuestionObj.qid;
}


function deleteFunction(QuestionObj)
{
  targetParent = event.target.parentNode;
  console.log(QuestionObj.qid);
  removeFromQuestionsArray(getQuestionIndex(QuestionObj.qid));
  deleteFromDataBase(QuestionObj.Questionname);
  targetParent.parentNode.removeChild(targetParent);
  
  
}
//********************************************json******************************************
/*var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (xhttp.readyState == 4 && xhttp.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      var ProdArray = JSON.parse( xhttp.responseText) ;
      for(var i=0;i<ProdArray.length;i++)
      {
          addProducttoDOM(ProdArray[i]);
      }
      }
    }
`
`

  function loadDoc()
{
  xhttp.open("GET", "/products");
  xhttp.send();
}*/

var userArray=[];
function checkLogin()
{
  if(sessionStorage.logarray)
   
  userArray=JSON.parse(sessionStorage.logarray);

  if(userArray.length!=0){
    loggedIn();
  }
  
}

var Name=document.getElementById("name");
var Logout=document.getElementById("logout");

function loggedIn()
{
  


  //************************************ */
  Name.innerHTML="Hello "+userArray[0].name+"";
  Name.setAttribute("href","#");
  //************************** */
 

  //***************************************** *
  Logout.innerHTML="Logout";
  



  Logout.addEventListener("click",function(){
  sessionStorage.logarray=JSON.stringify([]);
  });
 
}

function deleteFromDataBase(qname){
  console.log("Question to be deleted is with id----"+qname)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/delete", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("qname="+JSON.stringify(qname));
}

function updateDatabase(obj){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(obj));
}