const taskInput = document.getElementById('task__description'),
    taskBtn = document.querySelector('.button__add__task'),
    taskListWrapper = document.querySelector('.task__list__wrapper'),
    checkbox = document.querySelector('.checkbox'),
    deleteBtn = document.querySelector('.button__delete__task');

let tasks; // this array contain all task

// if localStorage is empty - tasks = []. If we have something in localStorage - bring it into massive tasks. Parse JSON format into js 
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))


let taskItemElements = [] // this array contain all new task__item__wrapper

function Task(descr) {
    this.descr = descr;
    this.completed = false;
}

const createNewTask = (task, index) => {

    return `
    <div class="task__item__wrapper ${task.completed ? 'completed' : ''}">
        <div class="task__item__descr">${task.descr}</div>
        <div class="task__item__buttons__wrapper">
            <input onclick = "completeTask(${index})" class="checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick = "deleteTask(${index})" class="button__delete__task">X</button>
        </div>
    </div>
`
}

const filterTasks = () => {
    if(tasks.length) { // if tasks array in not empty
    const notCompletedTasks = tasks.filter(item => item.completed == false);
    const CompletedTasks = tasks.filter(item => item.completed == true);
    tasks = [...notCompletedTasks, ...CompletedTasks ];
}


}


function addTask() {
    taskListWrapper.innerHTML = ''; // remove all tasks in tasklist
    if (tasks) { // if tasks array is not empty
        filterTasks(); // sort them  
        tasks.forEach((element, index) => {
            taskListWrapper.innerHTML += createNewTask(element, index);
        });
        taskItemElements = document.querySelectorAll('.task__item__wrapper'); // fill array with data of new creating task__item__wrapper by clicking on button Add
    }
}
addTask();

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)) // add array into localStorage. Using JSON format
}





const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed; // if element in array of tasks have property "completed" - change it to opposite 
    if (tasks[index].completed) {
        taskItemElements[index].classList.add('completed')
    } else {
        taskItemElements[index].classList.remove('completed')
    }
    updateLocalStorage();
    addTask();
}

taskBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocalStorage();
    addTask();
    taskInput.value = '';
});



const deleteTask = (index) => {
    taskItemElements[index].classList.add('deleting')
    setTimeout(() => {
    tasks.splice(index,1);
    updateLocalStorage();
    addTask();
   }, 700)
}

