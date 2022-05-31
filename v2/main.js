const taskMessage = document.querySelector('.task__message'),
      btnAddtask = document.querySelector('.task__btn__add'),
      newTaskList = document.querySelector('.new__tasks__list');
    

let completed;
let allTasks;  // this array contains all the tasks we want to perform
!localStorage.tasks ? allTasks = [] : allTasks = JSON.parse(localStorage.getItem('tasks')); // if localstorage is clear - set empty array to allTasks
createNewTasks(); // call the function to display the array, which is converted to layout on the page


btnAddtask.addEventListener('click', () => {

    if (!taskMessage.value) return  // we need to make sure that we have at least some text in the task
        const newTask = {
        description: taskMessage.value, // this property contain task message
        checked: false,
    }
    filterTasks()
    allTasks.push(newTask) // add new task in the array with all tasks
    createNewTasks(); // when click on button iterate array with all task contains in and push into browser
    filterTasks()
    updateLocalStorage()
    createNewTasks()
    taskMessage.value = '' // clear taskmessage after putting the button


});


function createNewTasks() {

    newTaskList.innerHTML = '' // when use this - clear ul
    allTasks.forEach((element,index) => { // then iterate array with all task

        newTaskList.innerHTML += ` 
        <li class="task ${element.checked ? 'completed': ''}" >
            <input type="checkbox" class="task__checkbox" id="${index}" ${element.checked ? 'checked': ''}>
            <label for="${index}" class="new__task__text">${index + 1} <br> ${element.description[0].toUpperCase() + element.description.slice(1)}</label> 
            <button onclick = "deleteTask(${index})" class="task__delete">X</button>
        </li>
        `
    })

}

function updateLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(allTasks))
}


newTaskList.addEventListener('click', (event) => {
    allTasks.forEach((item, index) => {

        if (event.target.getAttribute('id') == index) {
            item.checked = !item.checked
            filterTasks()
            updateLocalStorage()
            createNewTasks()
        }


    })
})

const deleteTask = (index) => {
    allTasks.splice(index,1);
    updateLocalStorage();
    createNewTasks();
}

function filterTasks() {
    if (allTasks.length) {
    const completedTasks = allTasks.filter(item => item.checked == true);
    const notCompletedTasks = allTasks.filter(item => item.checked == false);
    allTasks = [...notCompletedTasks, ...completedTasks]
    console.log(allTasks)
}
}
filterTasks()
updateLocalStorage()









