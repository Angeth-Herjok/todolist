console.log("MY TO-DOs");
const toDoLists = document.getElementById('todo-list');
 const getToDoss = () => {
  return fetch('https://dummyjson.com/todos/user/10')
    .then(res => res.json())
    .then(console.log);
 };

 let toDoList = document.getElementById('todo-list');
const getToDos = async () => {
  const todos=await fetch('https://dummyjson.com/todos/user/10')
    .then(response => response.json())
    .then(response => response.todos);

  todos.forEach(item => {
    let div = document.createElement('div');
    div.className = 'todo';
    let todo = document.createElement('p');
    let completed = document.createElement('p');

    todo.innerHTML = item.todo;
    completed.innerHTML = item.completed;

    div.appendChild(todo);
    div.appendChild(completed);

    toDoList.appendChild(div);
  });
};

getToDos();

const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const allTasksDiv = document.createElement('div');
allTasksDiv.id = 'allTasks';
const tasks = [];

function createTaskObject(task) {
  return {
    id: Date.now(),
    task,
    completed: false
  };
}


function addTask(event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task !== '') {
    const userID = 10; 
    const newTask = createTaskObject(task, userID);
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
  }
}

function createTaskObject(task, userID) {
  return {
    task: task,
    userID: userID,
    createdAt: new Date(),
  };
}


function renderTasks() {
  taskList.innerHTML = '';
  allTasksDiv.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task' + (task.completed ? ' completed' : '');
    taskItem.innerHTML = `
      <span>${task.task}</span>
      <button class="complete-btn">Done</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => completeTask(task.id));

    const editBtn = taskItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editTask(task.id));
    

    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    taskList.appendChild(taskItem);

    const taskText = document.createElement('p');
    taskText.textContent = task.task;
    allTasksDiv.appendChild(taskText);

  });
  document.body.appendChild(allTasksDiv);
}

function completeTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    const newTask = prompt('Enter a new task:', task.task);
    if (newTask !== null) {
      task.task = newTask.trim();
      renderTasks();
    }
  }
}


function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

addTaskForm.addEventListener('submit', addTask);

renderTasks();



// /* updating tasks
fetch('https://dummyjson.com/todos/10', {
  method: 'PUT', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    completed: false,
  })
})
.then(res => res.json())
.then(console.log);
            
// to delete
fetch('https://dummyjson.com/todos/1', {
  method: 'DELETE',
})
.then(res => res.json())
.then(console.log);



            



