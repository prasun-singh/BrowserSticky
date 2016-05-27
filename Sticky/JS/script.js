//"use strict";

(function(){
      
  var todo = document.querySelector( '#todolist' ),
  form = document.querySelector( 'form' ),
  field = document.querySelector( '#title' );
  var content = document.querySelector( '#content' );
  var formid = document.querySelector('div');    
  var sourceArr = null;
  var destArr = null;    
    

// method to listen the submit event and add the task to source array    
try{    
  form.addEventListener( 'submit', function( ev ) {
    refreshState();  
    if(!sourceArr){
        sourceArr = new Array;
    } 
    tasktime = Date.now();  
    task = { "id":tasktime,
            "title": field.value,
            "content": content.value,
            "type" : "note",
            "time":new Date(tasktime).toUTCString(),
            "modified": new Date()   
           } 
    sourceArr.push(task) 
    field.value = '';
    field.focus();
    content.value = '';  
    storestate();
    display()
    ev.preventDefault();
  }, false);
   }
    catch(err){ }

//method to render the html of array objects takes input of array to be worked upon   
function showElement(arr){
  var innerHTML = '';
    for(var i=0; i<arr.length;i++){
    var btn = "";
    var txtArea = ""; 
       if( arr[i].type == "note")
           {
    if(formid.getAttribute("id")=="index"){             
   
    btn = '<a id="deleteAT'+arr[i].id+'"  href="#" >Delete</a>'+
          '<a id="update'+arr[i].id+'"href="#">update</a>'
    txtArea = '<textarea id="contentbody">' +arr[i].content +             '</textarea> '
    }
   
    else{
    btn = '<a id="deleteTR'+arr[i].id+'"  href="#" >Delete</a>'+
          '<a id="restore'+arr[i].id+'"href="#">Restore</a>'
    
    txtArea = '<textarea id="contentbody" disabled col="20">'             +arr[i].content + '</textarea> '
    }  
    
    dropbtn = '<div class="dropdown">'+
              '<button class="dropbtn">&#9776;</button>'+
              '<div class="dropdown-content">'+btn
              '<a href="#">delete</a>'+
              '</div></div>'    
    
    innerHTML += '<li  class="todoList" id='+arr[i].id+'><div                class="heading"><h1>' + arr[i].title+ '</h1>                </div><div class="menu">'+dropbtn+'</div><div                class="noteContent"> '+txtArea+'</div></li>';    
      }
    }
 return innerHTML;   
}
  
// listen to the event of the operation performed by user    
document.addEventListener('click', function(e) {
    tar=e.target
    if(tar.tagName == 'A'){
    if(e.target.id.substring(0,8) == 'deleteAT'){
        ids = e.target.id.substring(8,e.target.id.length);
        i=getJsonElement(ids);
        if(!destArr){destArr = new Array}
        destArr.push(sourceArr[i]);
        sourceArr.splice(i,1);   
        storestate();
        display();
    }
    
    else if(e.target.id.substring(0,8) == 'deleteTR'){
        ids = e.target.id.substring(8,e.target.id.length);
        i=getJsonElement(ids);
        sourceArr.splice(i,1);
        storestate();
        display();
    }    
        
    else if(e.target.id.substring(0,6) == 'update'){
        var pnode = tar.parentNode.parentNode;
        ids = e.target.id.substring(6,e.target.id.length);
        i=getJsonElement(ids)
        if(localStorage.getItem("todo")){
        sourceArr = JSON.parse(localStorage.getItem("todo"));   
         }
        sourceArr[i].content =                        pnode.childNodes.item(2).childNodes.item(1).value;
        storestate();
        display();
    }
    
    else if(e.target.id.substring(0,7) == 'restore'){
        ids = e.target.id.substring(7,e.target.id.length);
        i=getJsonElement(ids);
        destArr.push(sourceArr[i]);
        sourceArr.splice(i,1);   
        storestate();
        display();
    }
    
    }
});   
    
    
// returns the index of the element by taking id    
function getJsonElement(id){
    refreshState();
    for(var i=0; i<sourceArr.length;i++){
        if(sourceArr[i].id==id) {
            return i;
        }}
    return "null";
 }  

// renders the html by adding it to todo
function display(){
 refreshState();    
todo.innerHTML = null;
    if (sourceArr) {
    todo.innerHTML = showElement(sourceArr);
    }    
}    
//assigns source and destination array based on the page type    
function refreshState(){
  var formid = document.querySelector( '#index' );   
      try{    
      if(formid){
          sourceArr = JSON.parse(localStorage.getItem("todo")) 
          destArr = JSON.parse(localStorage.getItem("trash"))
      }
      else{
       destArr = JSON.parse(localStorage.getItem("todo")) 
       sourceArr = JSON.parse(localStorage.getItem("trash"))  
      }
    }
    catch(err){console.log(err.message)}
}

window.onload = function(){
   refreshState();
    display();
}

window.emptyTrash = function() {
    sourceArr = [];
    storestate();
    display();
}

// store the respective array into local storage
function storestate() {
    if(formid.getAttribute("id")!="index"){
       temp = destArr;
        destArr = sourceArr;
        sourceArr = temp;
      }
    localStorage.setItem("todo",JSON.stringify(sourceArr))
    localStorage.setItem("trash",JSON.stringify(destArr))
  };
})();

    $("#notesOpen").click(function(){
        console.log("hello");
        $("#add").remove();
        $("#content").remove();
        $('#notesForm').append('<input type="textarea" name="content" id="content" placeholder="content" required="" height="300px">');
        $('#notesForm').append('<input type="submit" id="add" value="+">');
        $("#imgFile").remove();
    });
    
    /*
    render the adding imageNote html content when clicked in dropdown list
    */ 
    $("#imgOpen").click(function(){
        $("#add").remove();
        $("#content").remove();
        $('#notesForm').append('<input type="file" name="content" id="imgFile" placeholder="content" required="" height="300px">');
        $('#notesForm').append('<input type="submit" id="add" value="+">');
        $("#content").remove();
    });