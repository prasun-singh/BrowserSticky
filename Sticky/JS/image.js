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
    console.log("hello");
    refreshState();  
    if(!sourceArr){
        sourceArr = new Array;
    } 
    var imgtask;
    var img = document.getElementById('demoImg');
    var file =content.files[0];
    //var file = document.getE+lementById('bannerImg').value;             
     var fReader = new FileReader();
     fReader.onload = function() {
            //console.log(fReader.result);
         img.src = fReader.result;
         imgtask  = getBase64Image(img);
        //console.log(imgtask);
           var tasktime = Date.now();   
    var task = { "id":tasktime,
            "title": field.value,
            "content": imgtask, 
            "type" : "image" ,
            "time":new Date(tasktime).toUTCString(),
            "modified": new Date()   
           } 
    sourceArr.push(task)
    storestate();
    };
    
    fReader.readAsDataURL(file);
    field.value = '';
    field.focus();
    //content.value = '';  
    //display()
    //ev.preventDefault();
  }, false);
   }
    catch(err){ }

//method to render the html of array objects takes input of array to be worked upon   
  function showElement(arr){
    console.log("helo");
  var innerHTML = '';
    for(var i=0; i<arr.length;i++){
    var btn = "";
    var txtArea = "";
        if(arr[i].type == "image")
            {
    if(formid.getAttribute("id")=="imageIndex"){             
   
    btn = '<a id="deleteAT'+arr[i].id+'"  href="#" >Delete</a>'+
          '<a id="update'+arr[i].id+'"href="#">update</a>'
    img = "<img src= " +fetchImage(arr[i].content) + " id='contentbody' class='imgbody'>"
    }
   
    else{
    btn = '<a id="deleteTR'+arr[i].id+'"  href="#" >Delete</a>'+
          '<a id="restore'+arr[i].id+'"href="#">Restore</a>'
    
    img = "<img src= " +fetchImage(arr[i].content) + " id='contentbody' class='imgbody'>"
    }  
    
    dropbtn = '<div class="dropdown">'+
              '<button class="dropbtn">&#9776;</button>'+
              '<div class="dropdown-content">'+btn
              '<a href="#">delete</a>'+
              '</div></div>'    
    
    innerHTML += '<li  class="todoList" id='+arr[i].id+'><div                class="heading"><h1>' + arr[i].title+ '</h1>                </div><div class="menu">'+dropbtn+'</div><div                class="noteContent"> '+img+'</div></li>';    
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

 //renders the html by adding it to todo
function display(){
 refreshState();    
todo.innerHTML = null;
    if (sourceArr) {
    todo.innerHTML = showElement(sourceArr);
    }    
}    
//assigns source and destination array based on the page type    
function refreshState(){
  var formid = document.querySelector( '#imageIndex' );   
      try{    
      if(formid){
          sourceArr = JSON.parse(localStorage.getItem("todo")) 
          destArr = JSON.parse(localStorage.getItem("trash"))
          console.log(sourceArr);
          //display();
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
    if(formid.getAttribute("id")!="imageIndex"){
       temp = destArr;
        destArr = sourceArr;
        sourceArr = temp;
      }
    localStorage.setItem("todo",JSON.stringify(sourceArr))
    localStorage.setItem("trash",JSON.stringify(destArr))
    display();
  };
    
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    function fetchImage (dataImage) {
        return "data:image/png;base64," + dataImage;
    }
})();


    //add the image note in the localStorage
//    toDos.addImageNote = function(){
//        //var bannerImage = document.getElementById('bannerImg').value;
//        var title = document.getElementById('title').value;
//        //check for empty fields
//        if(bannerImage == '' || title == ''){
//            alert("Please fill both the fields....!!");
//            return false;
//        }
//        var img = document.getElementById('demoImg');
//        var file = document.getElementById('bannerImg').files[0];
//        //var file = document.getElementById('bannerImg').value;             
//        var toDoType = "image";
//        var fReader = new FileReader();
//        fReader.onload = function() {
//            //console.log(fReader.result);
//            document.getElementById('demoImg').src = fReader.result;
//            var task  = getBase64Image(img);
//            var noteObject =new note(title , task , toDoType)
//            notes.push(noteObject);
//            saveNotesState();
//            toDos.showNotes();
//        };
//       fReader.readAsDataURL(file);
//       document.getElementById('bannerImg').value = "";
//       document.getElementById('title').value = "";
//    }
//    
//                    if(notes[i].type == "image"){
//                var imgSrc = fetchImage(notes[i].note);
//                html+="<input id='file-input' type='file' style='display:none;'/><label for='file-input'><img src="+imgSrc+" width='180' height='200' id='tableBanner' class='noteImage' id='"+notes[i].timestamp+"'/></label>";
//                }
//
//    //convert thr image data into binary
//    function getBase64Image(img) {
//        var canvas = document.createElement("canvas");
//        canvas.width = img.width;
//        canvas.height = img.height;
//        var ctx = canvas.getContext("2d");
//        ctx.drawImage(img, 0, 0);
//        var dataURL = canvas.toDataURL("image/png");
//        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//    }
//
//    //return the url of image for displaying
//    \