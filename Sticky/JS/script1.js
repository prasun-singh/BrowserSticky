"use strict"; 

//global objet to call methods on load as required
var toDoArr ={};

//IIFE
(function(){
    
        var notes = new Array;
        var notesStr = localStorage.getItem('note');
        var trashNotes = new Array;
        var trashNotesStr = localStorage.getItem('trash');
        if (notesStr !== null) {
            notes = JSON.parse(notesStr); }
        if (trashNotesStr !== null) {
            trashNotes = JSON.parse(trashNotesStr); }
    
       //condition to check whether to delete a note  
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

    //method for updating the trash length
    toDoArr.updateTrashLength = function(){
        document.getElementById('trashLink').innerHTML = "Trash("+trashNotes.length+")"; 
    }

    //empty the trashed notes
    toDoArr.emptyTrash = function(){
        trashNotes.splice(0,trashNotes.length);
        saveTrashState();
        toDoArr.showTrashNotes();
        toDoArr.updateTrashLength();
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
    toDoArr.addNote = function() 
    {
        var task = document.getElementById('task').value;
        var title = document.getElementById('title').value;
        //check for empty fields
        if(task == '' || title == ''){
            alert("Please fill both the fields....!!");
            return false;
        }
        //var reminder = document.getElementById('reminder').value;
        var toDoType = "note";
        var noteObject =new note(title ,task , toDoType) ;
        notes.push(noteObject);
        saveNotesState();
        toDoArr.showNotes();
        document.getElementById('task').value = "";
        document.getElementById('title').value = "";
        return false;
    }
    
    //add the image note in the localStorage
    toDoArr.addImageNote = function(){
        var bannerImage = document.getElementById('bannerImg').value;
        var title = document.getElementById('title').value;
        //check for empty fields
        if(bannerImage == '' || title == ''){
            alert("Add the title and content!!");
            return false;
        }
        var img = document.getElementById('demoImg');
        var file = document.getElementById('bannerImg').files[0];
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
            toDoArr.showNotes();
        };
       fReader.readAsDataURL(file);
       document.getElementById('bannerImg').value = "";
       document.getElementById('title').value = "";
    }

    //update note according to the id generated
    toDoArr.updateNote = function(id){
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
        toDoArr.showNotes();
        return false;
    }

    //move the note to trash with respect to its timestamp id
    toDoArr.removeNote = function(id) {
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
        toDoArr.showNotes();
        toDoArr.updateTrashLength();
        alert("Note has been moved to trash..!!!");
        return false;
    }

    //restore the trashNotes back to normal notes
    toDoArr.restoreTrashNote = function(id){
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
        toDoArr.showTrashNotes();
        toDoArr.updateTrashLength();
        alert("Note has been restored..!!!");
        return false;   
    }

    //delete the note from trash with respect to timestamp id
    toDoArr.deleteTrashNote = function(id) {
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
        toDoArr.showTrashNotes();
        toDoArr.updateTrashLength();
        return false;
       }
    }

    //display all the notes  
    toDoArr.showNotes = function() {
        var html = '<ul>';
        for(var i=0; i<notes.length; i++) {
            html += "<li><div class='colour1'>" + 
                        "<form class='updateForm' id='"+notes[i].timestamp+"' onsubmit='toDoArr.updateNote(this.id)'>" +
                "<input type='text' class='note-title' placeholder='Untitled' maxlength='10' value='"+notes[i].title + "' id='"+notes[i].timestamp+"'/>";
                if(notes[i].type == "image"){
                var imgSrc = fetchImage(notes[i].note);
                html+="<input id='file-input' type='file' style='display:none;'/><label for='file-input'><img src="+imgSrc+" width='180' height='200' id='tableBanner' class='noteImage' id='"+notes[i].timestamp+"'/></label>";
                }
            else if(notes[i].type == "note"){
               html+="<textarea class='note-content' placeholder='Your content here' id='"+notes[i].timestamp+"' />"+notes[i].note+"</textarea>";
            }
            html+="<img src='../images/close.png' onclick='toDoArr.removeNote(this.parentNode.id)' class='delete'/>" +
                    "<input type='submit' class='updated' value='update'/>" +
                    "</form></div></li>";
                };
        html += '</ul>';
        document.getElementById('notes').innerHTML = html;
    }

    //display all the trash notes
    toDoArr.showTrashNotes = function(){
        var html = '<ul>';
        for(var i=0; i<trashNotes.length; i++) {
            html += "<li><div class='colour1'>" + 
                        "<form class='updateForm' id='"+trashNotes[i].timestamp+"'>" +
                "<input type='text' class='note-title' placeholder='Untitled' maxlength='10' value='"+trashNotes[i].title + "' id='"+trashNotes[i].timestamp+"'/>";
                if(trashNotes[i].type == "image"){
                  var imgSrc = fetchImage(trashNotes[i].note);
                  html+="<img src="+imgSrc+" id='tableBanner' class='noteImage' class='tableBanner'/>";
                }
            else if(trashNotes[i].type == "note"){
                  html+="<textarea class='note-content' placeholder='Your content here' id='"+trashNotes[i].timestamp+"' />"+trashNotes[i].note+"</textarea>";
            }
            html+="<img src='../images/close.png' onclick='toDoArr.deleteTrashNote(this.id)' class='delete' id='" + trashNotes[i].timestamp + "'/>" +
                       "<input type='button' class='updated' value='restore' onclick='toDoArr.restoreTrashNote(this.id)' id='" + trashNotes[i].timestamp + "'/>" +
                        "</form></div></li>";
                };
        html += '</ul>';
        document.getElementById('trashNotes').innerHTML = html;  
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
        $("#add").remove();
        $("#content").remove();
        $('#toDoMain').append('<div class="input-group input-group-lg inputBox" id="content"><textarea class="form-control note_area" id="task" placeholder="take a note.." aria-describedby="sizing-addon1" required onkeyup="autoGrow(this)"></textarea></div>');
        $('#toDoMain').append('<div id="add" class="addButton" ><input type="submit" class="button"  onclick="toDoArr.addNote()" value="Done"></div>');
        $("#imgFile").remove();
    });
    
    /*
    render the adding imageNote html content when clicked in dropdown list
    */ 
    $("#imgOpen").click(function(){
        $("#add").remove();
        $("#imgFile").remove();
        $('#toDoMain').append('<div class="input-group input-group-lg inputBox" id="imgFile"><input type="file" required id="bannerImg"/></div>');
        $('#toDoMain').append('<div id="add" class="addButton" ><input type="submit" class="button" onclick="toDoArr.addImageNote()" value="Done"></div>');
        $("#content").remove();
    });
})();

var elements = document.getElementsByTagName('body');
var id = elements[0].getAttribute('id');

if(id == "mainPage"){toDoArr.showNotes();}
if(id == "trashPage"){toDoArr.showTrashNotes();}
toDoArr.updateTrashLength;

//for dyanamically growing textarea
function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}