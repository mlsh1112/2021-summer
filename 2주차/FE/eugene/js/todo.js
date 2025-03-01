const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
//const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    //console.log(event);
    //console.log(event.target.parentElement.innerText);
   const li = event.target.parentElement;
   li.remove();
   toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
   saveToDos(); 
}

function paintToDo(newTodo){
    //console.log("i will paint", newTodo);
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    //console.log(li);
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);  
    
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    //console.log(toDoInput.value);
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    //console.log(newTodo, toDoInput.value);

    const newTodoObj={
        text:newTodo,
        id:Date.now(),  //li item을 구별하기 위해
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item){
    console.log("this is the turn of ", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);
//console.log(savedToDos);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    //console.log(parsedToDos);
    //parsedToDos.forEach(sayHello);
    //parsedToDos.forEach((item) => console.log("this is the turn of ", item));    

    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);

}

