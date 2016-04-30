(function(){
      
  var todo = document.querySelector( '#todolist' ),
  form = document.querySelector( 'form' ),
  field = document.querySelector( '#title' );
  var content = document.querySelector( '#content' );
  var todoarr = new Array;

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

    
function showElement(arr){
  var innerHTML = '';
        for(var i=0; i<arr.length;i++){
              dropbtn = '<div class="dropdown">'+
  '<button class="dropbtn">&#9776;</button>'+
  '<div class="dropdown-content">'+
    '<a id="delete'+arr[i].id+'"  href="#" >Delete</a>'+
    '<a id="update'+arr[i].id+'"href="#">update</a>'+
    '<a href="#">delete</a>'+
  '</div>'+
'</div>'    
            innerHTML += '<li  class="todoList" id='+arr[i].id+'><div class="menu">'+dropbtn+'</div><div class="heading"><h1>' + arr[i].title+ '</h1></div><textarea id="contentbody">' +arr[i].content + '</textarea></li>';    
      }
 return innerHTML;   
}
  
    
document.addEventListener('click', function(e) {
    tar=e.target
    if(tar.tagName == 'A'){
    var pnode = tar.parentNode.parentNode.parentNode.parentNode;
    todoarr = JSON.parse(localStorage.getItem("todo"));
        console.log(e.target.id.substring(6,e.target.id.length))
    if(e.target.id.substring(0,6) == 'delete'){
        ids = e.target.id.substring(6,e.target.id.length);
        i=getJsonElement(ids)
        todoarr.splice(i,1);    
        storestate();
        display();
    }
        
    else if(e.target.id.substring(0,6) == 'update'){
        ids = e.target.id.substring(6,e.target.id.length);
        i=getJsonElement(ids)
        console.log(pnode.childNodes.item(2).value)
        if(localStorage.getItem("todo")){
        todoarr = JSON.parse(localStorage.getItem("todo")) ;   
         }
        todoarr[i].content = pnode.childNodes.item(2).value;
        storestate() ;
        display();
    }}
});   
    
    
    
function getJsonElement(id){
    arr = JSON.parse(localStorage.getItem("todo"));
    for(var i=0; i<arr.length;i++){
        if(arr[i].id==id) {
            console.log(i);
            return i;
        }}
    return "null";
 }  


function display(){
todo.innerHTML = null;
    arr = localStorage.getItem("todo");
    if (arr) {
    arr = JSON.parse(localStorage.getItem("todo"));
    todo.innerHTML = showElement(arr)}    
}    
    

window.onload = function(){
display();
}


function storestate() {
    localStorage.setItem("todo",JSON.stringify(todoarr)) 
  };
})();