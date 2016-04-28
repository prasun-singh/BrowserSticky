(function(){
      
  var todo = document.querySelector( '#todolist' ),
      form = document.querySelector( 'form' ),
      field = document.querySelector( '#title' );
      content = document.querySelector( '#content' );
      todoarr = new Array;
      id =null;
      dropbtn = '<div class="dropdown">'+
  '<button class="dropbtn">&#9776;</button>'+
  '<div class="dropdown-content">'+
    '      <button id="rambo" name="rambo"><a href="#" >Delete</a></button>'+
    '<a href="#">update</a>'+
    '<a href="#">delete</a>'+
  '</div>'+
'</div>'

  form.addEventListener( 'submit', function( ev ) {
    id = localStorage.getItem("ID");  
      console.log("id ids === "+id)
    if(id === undefined || id === null){id = 0}
      id = parseInt(id)+1 
      console.log("id id === "+id)
    task = { "id":id,"title": field.value,"content": content.value, "time":new Date(),"modified": new Date()   }  
    todoarr.push(task) 
    field.value = '';
    field.focus();
    content.value = '';  
    storestate();
         showElement(new Array(task));
 
    ev.preventDefault();
  }, false);

    
function showElement(arr){
      /*if ( localStorage.getItem("todo") ) {
        arr = JSON.parse(localStorage.getItem("todo"));
    */
        for(var i=0; i<arr.length;i++){
            console.log(arr[i].id)
            todo.innerHTML += '<li  class="todoList" id='+arr[i].id+'><div class="menu">'+dropbtn+'</div><div class="heading"><h1>' + arr[i].title+ '</h1></div><div contenteditable="true">' +arr[i].content + '</div></li>';    
            
        //}
      }
    
}

window.onload = function(){
    if ( localStorage.getItem("todo") ) {
        arr = JSON.parse(localStorage.getItem("todo"));
        showElement(arr);}
    
           var rambo = document.getElementById('rambo');
        todo.addEventListener( 'click', function( ev ) {
    var t = ev.target;
    var pnode = t.parentNode.parentNode.parentNode.parentNode.parentNode;                    
       console.log("id is"+pnode.getAttribute("id"))
        if ( localStorage.getItem("todo") ) {
        arr = JSON.parse(localStorage.getItem("todo"));
        console.log(arr[i]);    
        for(var i=0; i<arr.length;i++){
            if(arr[i].id===id) {
                console.log(arr[i])
                todoarr.splice(i-1,1)
            }   
            storestate();
        }}
            
     
    if ( pnode.tagName === 'LI' ) {

        pnode.parentNode.removeChild( pnode );
 
        
        
        storestate();
        console.log("hello");
    }
    },false) 
}

    
/*  rambo.addEventListener( 'click', function( ev ) {
   alert("hello");
  },false);*/
 
/*function del(){
        todo.addEventListener( 'click', function( ev ) {
    var t = ev.target;
    if ( t.parentNode.tagName === 'LI' ) {

        t.parentNode.removeChild( t );}
    },false) }   */
    
  function storestate() {
    localStorage.todolist = todo.innerHTML;
    localStorage.setItem("todo",JSON.stringify(todoarr)) 
    localStorage.setItem("ID",id)
  };

  function retrievestate() {
    if ( localStorage.todolist ) {
      todo.innerHTML = localStorage.todolist;
    }
  };

})();