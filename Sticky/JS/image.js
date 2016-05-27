"use strict"; 

//global objet to call methods on load as required
var toDos ={};

//IIFE
(function(){
    
        //global vaiables
        var notes = new Array;
        var notesStr = localStorage.getItem('note');
        var trashNotes = new Array;
        var trashNotesStr = localStorage.getItem('trash');
        if (notesStr !== null) {
            notes = JSON.parse(notesStr); }
        if (trashNotesStr !== null) {
            trashNotes = JSON.parse(trashNotesStr); }
    
       //for deleting todos after 7 days from trash
       if(localStorage.getItem('trash')){   
        for(var i=trashNotes.length-1 ; i>=0 ;i--){
            var one_day=1000*60*60*24;
            var time = new Date(trashNotes[i].timestamp);
            var d = new Date();
            var diff = d.getTime() - time.getTime();
            var diff_days = Math.round(diff/one_day);
            if(diff_days >= 7){
              trashNotes.splice(i,1);
              saveTrashState;
            }
        else{
        break;
        } 
     }
  }

    //updated the trash length for reflecting in header
    toDos.updateTrashLength = function(){
        document.getElementById('trashLink').innerHTML = "Trash("+trashNotes.length+")"; 
    }

    //empty the trashed notes
    toDos.emptyTrash = function(){
        trashNotes.splice(0,trashNotes.length);
        saveTrashState();
        toDos.showTrashNotes();
        toDos.updateTrashLength();
        alert("trash is empty now...!!");
    }

    //object created for new note and trashnote
    function note(title ,task ,toDoType)
        {
          this.id = new Date();
          this.title = title;
          this.note = task;
          this.type = toDoType;
          this.timestamp = new Date();
        }

    //saving the notes to localstorage after crud operations
    function saveNotesState()
    {
        localStorage.setItem('note', JSON.stringify(notes));
        return false;
    }

    //saving the trashNotes to localstorage after crud operations
    function saveTrashState(){
        localStorage.setItem('trash', JSON.stringify(trashNotes));
        return false;
    }
    
    //add a new note and stored into localstorage
    toDos.addNote = function() 
    {
        console.log("hemp");
        var task = document.getElementById('content').value;
        var title = document.getElementById('title').value;
        //check for empty fields
        if(task == '' || title == ''){
            alert("Please fill both the fields....!!");
            return false;
        }
        var toDoType = "note";
        var noteObject =new note(title ,task , toDoType) ;
        notes.push(noteObject);
        saveNotesState();
        toDos.showNotes();
        document.getElementById('content').value = "";
        document.getElementById('title').value = "";
        return false;
    }
    
    //add the image note in the localStorage
    toDos.addImageNote = function(){
        var bannerImage = document.getElementById('imgFile').value;
        var title = document.getElementById('title').value;
        //check for empty fields
        if(bannerImage == '' || title == ''){
            alert("Please fill both the fields....!!");
            return false;
        }
        var img = document.getElementById('demoImg');
        var file = document.getElementById('imgFile').files[0];
        //var file = document.getElementById('bannerImg').value;             
        var toDoType = "image";
        var fReader = new FileReader();
        fReader.onload = function() {
            //console.log(fReader.result);
            document.getElementById('demoImg').src = fReader.result;
            var task  = getBase64Image(img);
            var noteObject =new note(title , task , toDoType)
            notes.push(noteObject);
            saveNotesState();
            toDos.showNotes();
        };
       fReader.readAsDataURL(file);
       document.getElementById('imgFile').value = "";
       document.getElementById('title').value = "";
    }

    //update note according to the id generated
    toDos.updateNote = function(id){
        var title = document.getElementById(id).getElementsByClassName("note-title")[0].value;
        var note = document.getElementById(id).getElementsByClassName("note-content")[0].value;
        //var img =  $("#"+id).find(".tableBanner#" + id ).val();
        for(var i=0;i<notes.length;i++){
            if(notes[i].id == id){
                console.log("hello");
                notes[i].id= new Date();
                notes[i].note=note;
                notes[i].title=title;
                notes[i].timestamp= new Date();
                break;
            }
        }
        saveNotesState();
        toDos.showNotes();
        return false;
    }

    //move the note to trash with respect to its timestamp id
    toDos.removeNote = function(id) {
        for(var i=0; i< notes.length; i++){
          if(notes[i].id == id){
            var trashNoteObject =new note(notes[i].title ,notes[i].note , notes[i].type ) ;
             trashNotes.push(trashNoteObject);
             localStorage.setItem('trash', JSON.stringify(trashNotes));
             notes.splice(i,1);
             break;
          }   
        }
        saveTrashState();
        saveNotesState();
        toDos.showNotes();
        toDos.updateTrashLength();
        alert("Note has been moved to trash..!!!");
        return false;
    }

    //restore the trashNotes back to normal notes
    toDos.restoreTrashNote = function(id){
        for(var i=0;i<trashNotes.length;i++){
            if(trashNotes[i].id == id){
            var noteObject =new note(trashNotes[i].title ,trashNotes[i].note , trashNotes[i].type) ;
             notes.push(noteObject);
             trashNotes.splice(i,1);
             break;
            }
        }
        saveTrashState();
        saveNotesState();
        toDos.showTrashNotes();
        toDos.updateTrashLength();
        alert("Note has been restored..!!!");
        return false;   
    }

    //delete the note from trash with respect to timestamp id
    toDos.deleteTrashNote = function(id) {
        console.log(id);
        var result = confirm("Delete Note forever?");
        if(result){
        for(var i=0; i< trashNotes.length; i++){
          if(trashNotes[i].id == id){
             console.log("t");
             trashNotes.splice(i,1);
             break;
          }   
        }
        saveTrashState();
        toDos.showTrashNotes();
        toDos.updateTrashLength();
        return false;
       }
    }

    //display all the notes  
    toDos.showNotes = function() {
        var innerHTML="<ul>";
        var content;
        for(var i=0; i<notes.length; i++) {
            
                if(notes[i].type == "image"){
                var imgSrc = fetchImage(notes[i].note);
                content = "<img src="+imgSrc+" id='contentbody' class='imgbody' id='"+notes[i].timestamp+"'/>";
                }
            else if(notes[i].type == "note"){
               content = "<textarea class='note-content' placeholder='Your content here' id='"+notes[i].timestamp+"'>"+notes[i].note+"</textarea>";
            }
            var dropbtn = '<div class="dropdown">'+
              '<button class="dropbtn">&#9776;</button>'+
              '<div class="dropdown-content"><input type="submit" class="updated" value="update"/>'+
              '<a href="#" onclick="toDos.removeNote(this.id)" id="'+notes[i].timestamp+'">delete</a>'+
              '</div></div>';
            console.log(content);
            
   innerHTML += '<li class="todoList"><form class="updateForm" id="'+notes[i].timestamp+'" onsubmit="toDos.updateNote(this.id)"><div class="heading"><h1 class="note-title" id="'+notes[i].timestamp+'">' +notes[i].title+ '</h1> </div><div class="menu">'+dropbtn+'</div><div class="noteContent"> '+content+'</div></form></li>'; 
            
        //console.log(innerHTML);
        }    
    innerHTML +="</ul>";
        document.getElementById('todolist').innerHTML = innerHTML;
    }

    //display all the trash notes
    toDos.showTrashNotes = function(){
        var innerHTML="<ul>";
        var content;
        for(var i=0; i<trashNotes.length; i++) {
            
                if(trashNotes[i].type == "image"){
                var imgSrc = fetchImage(trashNotes[i].note);
                content = "<img src="+imgSrc+" id='contentbody' class='imgbody' id='"+trashNotes[i].timestamp+"'/>";
                }
            else if(trashNotes[i].type == "note"){
               content = "<textarea class='note-content' placeholder='Your content here' id='"+trashNotes[i].timestamp+"'>"+trashNotes[i].note+"</textarea>";
            }
            var dropbtn = '<div class="dropdown">'+
              '<button class="dropbtn">&#9776;</button>'+
              '<div class="dropdown-content"><input type="submit" class="updated" value="restore"/>'+
              '<a href="#" onclick="toDos.deleteTrashNote(this.id)" id="'+trashNotes[i].timestamp+'">delete</a>'+
              '</div></div>';
            console.log(content);
            
   innerHTML += '<li class="todoList"><form class="updateForm" id="'+trashNotes[i].timestamp+'" onsubmit="toDos.restoreTrashNote(this.id)"><div class="heading"><h1 class="note-title" id="'+trashNotes[i].timestamp+'">' +trashNotes[i].title+ '</h1> </div><div class="menu">'+dropbtn+'</div><div class="noteContent"> '+content+'</div></form></li>'; 
            
        //console.log(innerHTML);
        }    
    innerHTML +="</ul>";
        document.getElementById('todolist').innerHTML = innerHTML;  
    }

    //convert thr image data into binary
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    //return the url of image for displaying
    function fetchImage (dataImage) {
        return "data:image/png;base64," + dataImage;
    }
    
    /*
    render the adding notes html content after clicked in dropdown list
    */
    
        $("#notesOpen").click(function(){
        console.log("hello");
        $("#add").remove();
        $("#imgFile").remove();
        $("#content").remove();
        $('#notesForm').append('<input type="textarea" name="content" id="content" placeholder="content" required="" height="300px">');
        $('#notesForm').append('<input type="button" id="add" value="+" onclick="toDos.addNote()">');
        $("#imgFile").remove();
    });
    
    /*
    render the adding imageNote html content when clicked in dropdown list
    */ 
    $("#imgOpen").click(function(){
        $("#add").remove();
        $("#content").remove();
        $("#imgFile").remove();
        $('#notesForm').append('<input type="file" name="content" id="imgFile" placeholder="content" required="" height="300px">');
        $('#notesForm').append('<input type="button" id="add" value="+" onclick="toDos.addImageNote()">');
        $("#content").remove();
    });
})();

var elements = document.getElementsByTagName('body');
var id = elements[0].getAttribute('id');

if(id == "mainPage"){toDos.showNotes();}
if(id == "trashPage"){toDos.showTrashNotes();}
toDos.updateTrashLength;


   /* btn = '<a id="deleteAT'+arr[i].id+'"  href="#" >Delete</a>'+
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
      }*/