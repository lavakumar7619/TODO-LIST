const list=document.querySelector("#list ul");
list.addEventListener('click',function(e){
    if(e.target.classList =='delete'){
          const li=e.target.parentElement;
          removeLocalTodos(li);
           list.removeChild(li);
       }
       
});


const add=document.forms['add'];
add.addEventListener('submit',function(e){
    e.preventDefault();
    const value=add.querySelector('input[type="text"]').value;

    if(value===""){
       alert("Please Enter Valid Input ");   
    }
     else {
    const li=document.createElement("li");
    const name=document.createElement('span');
    const deletebtn=document.createElement('span');
    const checkbtn=document.createElement("input");
    const label=document.createElement("label");
    
    //local storge
    saveLocalTodos(value);

    deletebtn.textContent='Delete';
    name.textContent=value;

    name.classList.add('name');
    checkbtn.setAttribute("type","checkbox");
    checkbtn.setAttribute("class","hide");
    label.setAttribute("type","hide");
    label.innerHTML=`Incomplete`;
    deletebtn.classList.add('delete');

    li.appendChild(name);
    li.appendChild(checkbtn);
    li.appendChild(label);
    li.appendChild(deletebtn);
    list.appendChild(li);

    const reset=document.querySelector("input");
    reset.value="";
    }
    
});

//compplete and incomplete
var ul=document.querySelector('#ul');
ul.addEventListener('click',function(e){
    const status=document.querySelectorAll(".hide");
    const map1 = Array.from(status).map(x =>{
        x.addEventListener('change',function(e){
            if(e.target.checked){
                e.target.nextElementSibling.innerHTML=`Completed`;
                e.target.nextElementSibling.style.color="green";
            }
            else{
                e.target.nextElementSibling.innerHTML=`Incomplete`;
                e.target.nextElementSibling.style.color="red";
            }
        });
    } );
});

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

//after loading gettodo excute
document.addEventListener('DOMContentLoaded',getTodos);

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        const li=document.createElement("li");
        const name=document.createElement('span');
        const deletebtn=document.createElement('span');
        const checkbtn=document.createElement("input");
        const label=document.createElement("label");

        deletebtn.textContent='Delete';
        name.textContent=todo;

        name.classList.add('name');
        checkbtn.setAttribute("type","checkbox");
        checkbtn.setAttribute("class","hide");
        label.setAttribute("type","hide");
        label.innerHTML=`Incomplete`;
        deletebtn.classList.add('delete');

        li.appendChild(name);
        li.appendChild(checkbtn);
        li.appendChild(label);
        li.appendChild(deletebtn);
        list.appendChild(li);
    });
}
//remove from localstorage
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}
