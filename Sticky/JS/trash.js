(function(){
      
  var todo = document.querySelector( '#todolist' ),
  form = document.querySelector( 'form' ),
  field = document.querySelector( '#title' );
  var content = document.querySelector( '#content' );
  var todoarr = new Array;

    
/*   try{    
  form.addEventListener( 'submit', function( ev ) {
    task = { "id":Date.now(),"title": field.value,"content": content.value, "time":new Date(),"modified": new Date()   } 
    todoarr.push(task) 
    field.value = '';
    field.focus();
    content.value = '';  
    storestate();
    display()
    ev.preventDefault();
  }, false);
   }
    catch(err){
        console.log(err.message);
    }*/

    
function showElement(arr){
  var innerHTML = '';
        for(var i=0; i<arr.length;i++){
              dropbtn = '<div class="dropdown">'+
  '<button class="dropbtn">&#9776;</button>'+
  '<div class="dropdown-content">'+
    '<a id="delete'+arr[i].id+'"  href="#" >Delete</a>'+
    '<a id="restore'+arr[i].id+'"href="#">Restore</a>'+
  '</div>'+
'</div>'    
            innerHTML += '<li  class="todoList" id='+arr[i].id+'><div class="menu">'+dropbtn+'</div><div class="heading"><h1>' + arr[i].title+ '</h1></div><textarea id="contentbody" disabled>' +arr[i].content + '</textarea></li>';    
      }
 return innerHTML;   
}
  
    
document.addEventListener('click', function(e) {
    tar=e.target
    if(tar.tagName == 'A'){
    var pnode = tar.parentNode.parentNode.parentNode.parentNode;
    todoarr = JSON.parse(localStorage.getItem("todo"));
    trasharr = JSON.parse(localStorage.getItem("trash"));    
        console.log(e.target.id.substring(7,e.target.id.length))
    if(e.target.id.substring(0,6) == 'delete'){
        ids = e.target.id.substring(6,e.target.id.length);
        i=getJsonElement(ids)
        trasharr.splice(i,1);
        storestate();
        display();
    }
        
    else if(e.target.id.substring(0,7) == 'restore'){
        ids = e.target.id.substring(7,e.target.id.length);
        i=getJsonElement(ids);
        console.log(i)
        
        todoarr.push(trasharr[i]);
        trasharr.splice(i,1);   
        storestate();
        display();
    }}
});   
    
    
    
function getJsonElement(id){
    arr = JSON.parse(localStorage.getItem("trash"));
    for(var i=0; i<arr.length;i++){
        if(arr[i].id==id) {
            console.log(i);
            return i;
        }}
    return "null";
 }  


function display(){
todo.innerHTML = null;
    console.log("display ")
    arr = localStorage.getItem("trash");
    if (arr) {
    arr = JSON.parse(localStorage.getItem("trash"));
    todo.innerHTML = showElement(arr)}    
}    
    

window.onload = function(){
display();
}


function storestate() {
    localStorage.setItem("todo",JSON.stringify(todoarr))
    localStorage.setItem("trash",JSON.stringify(trasharr))
  };
})();