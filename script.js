const clickable = document.getElementById("add-option");
clickable.addEventListener("click", ToggleTaskModal);

var boxIndex = -1;
var singleTaskIndex = -1;

Todos = [];
renderItems();

function ToggleTaskModal() {
  const taskInput = document.getElementById("task-input");
  taskInput.value = "";
  document.getElementById('listText').style.display= 'none';
  const modal = document.getElementById("task-modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {renderItems()
    modal.style.display = "block";
  }
  taskInput.focus();
}

function ToggleSingleTaskModal() {
 
  const modal = document.getElementById("single-task-modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
 
}

function ToggleItemModal() {
  const itemInput = document.getElementById("item-input");
  itemInput.value ="";
    const modal = document.getElementById("item-modal");
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
    itemInput.focus();
  }
function removeValueAtIndex(index)
{   const left = Todos.slice(0,index);
    const right = Todos.slice(Number(index)+1,Todos.length);
    Todos = left.concat(right);
}

function addTask() {
    const taskInput =document.getElementById("task-input");
    const newObj = {name:taskInput.value,items:[]};
    Todos.push(newObj);
    renderItems();
    ToggleTaskModal();

}


function addItem() {
  console.log("Add Item Called for Index :" ,boxIndex);
  const itemInput = document.getElementById("item-input");
  console.log("Item input given : ", itemInput.value);
  const newItemObject = {name : itemInput.value , isCompleted : false};
  // const newItemObject ={name :itemInput.value ,isCompleted : false};
  Todos[boxIndex].items.push(newItemObject);
  renderItems();
  ToggleItemModal();
  singlerenderItems();
}
function singlerenderItems(){
  const card = document.getElementById('NAME');
  card.innerHTML="";
   const singleTask = document.getElementsByClassName("taskCard")[singleTaskIndex];
   card.appendChild(singleTask);
   renderItems();
 }

// This Function displays all the data in athe Todos Array
function renderItems() {

    var index = 0;
  // Each time the RenderItems Function is called , it will empty the taskcontainer
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  Todos.map((value) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.id = index;
    index++;

    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("taskTitle");
    taskCard.appendChild(taskTitle);
    taskTitle.addEventListener('click',() =>{
      ToggleSingleTaskModal();
      singleTaskIndex=taskTitle.parentElement.id
      document.getElementById('single-task-name').innerText=Todos[singleTaskIndex].name;
      
      // document.getElementById('NAME').innerHTML=taskCard.innerHTML;
      // ToggleItemModal();

      singlerenderItems();
      renderItems();
      console.log("Index :", singleTaskIndex);
    });
    taskTitle.innerText = value.name;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const addBtn = document.createElement("img");
    addBtn.src = "add_btn.svg";
    addBtn.style.width = "30px";
    addBtn.style.height = "30px";
    addBtn.classList.add('Addbtn');
    addBtn.addEventListener("click",() => {
        ToggleItemModal();
        renderItems();
        boxIndex = addBtn.parentElement.parentElement.id;
    })

    const delBtn = document.createElement("img");
    delBtn.src = "delete_btn.svg";
    delBtn.style.width = "30px";
    delBtn.style.height = "30px";
    delBtn.addEventListener('click',() =>{
        const delIndex = delBtn.parentElement.parentElement.id;
        removeValueAtIndex(delIndex);
        renderItems();
        singlerenderItems();

    });

    buttonContainer.appendChild(addBtn);
    buttonContainer.appendChild(delBtn);


    const itemList = document.createElement("ul");
    itemList.style.flex = "1";
    itemList.style.listStyleType = "none";
    itemList.style.lineHeight = "25px"

    value.items.map((item) => {
      const markBtn = document.createElement("p");
      markBtn.innerText = "Mark Done";
      markBtn.classList.add("markBtn")

      const item1 = document.createElement("li");
      item1.innerText = item.name;
      item1.append(markBtn);

      markBtn.addEventListener("click", () => {
        item.isCompleted = !item.isCompleted;
        renderItems();
        if(!(singleTaskIndex === -1)){
          singlerenderItems();
          // renderItems();
        }
      });

      if (item.isCompleted) {
        item1.style.textDecoration = "line-through";
        item1.style.color = "#ed5935"
        markBtn.style.display = "none";
      }
      itemList.appendChild(item1);
    });

    taskContainer.appendChild(taskCard);
    taskCard.appendChild(itemList);
    taskCard.appendChild(buttonContainer);
   
  });

  
}
