let $taskInput; // place where user type task
let $taskSumbmitionBtn; // add button
let $alertInfo; // alert paragraph
let $taskList; // ul list which contains our generated tasks
let $taskCheckButton;
let $wrapperDiv;
let $editWindowWrapperDiv;
let $changeTaskInsideEditBtn;
let $newTaskContentsInput;

let $taskId = 0;
let $isInputEmpty;
let $tempTaskIdToChangeContens;

const createTaskElement = function(taskText) {
  $taskId++;
  const newTaskLi = document.createElement('li');
  newTaskLi.className = 'task';
  newTaskLi.setAttribute('id', `task-${$taskId}`);
  newTaskLi.innerHTML = `
    <p class="task-par">${taskText}</p>
    <span class="checked">Completed!</span>
    <div class="tools">
      <button class="task-button edit"><i class="fas fa-edit"></i></button><button class="task-button remove"><i class="fas fa-times"></i></button><button class="task-button complete"><i class="fas fa-check"></i></button>
    </div>
    `;
  return newTaskLi;
}

const checkInput = function() {
  if ($taskInput.value === '') {
    $isInputEmpty =  true;
  } else {
    $isInputEmpty = false;
  }
}


const changeAlertInfo = function(taskQuantity, isInputEmpty) {
  if (isInputEmpty) {
    $alertInfo.style.display = 'block';
    $alertInfo.textContent = `Type task's contents.`;
    $alertInfo.style.color = 'red';
  }else if (taskQuantity === 0) {
    $alertInfo.textContent = `List is empty.`;
    $alertInfo.style.color = 'black';
  } else if (taskQuantity !== 0) {
    $alertInfo.style.display = 'none';
    $taskList.style.marginTop = 0;
  }
}

const addNewTask = function() {
  let taskContents = $taskInput.value;
  checkInput();
  if (!$isInputEmpty) {
    const newTaskElement = createTaskElement(taskContents);
    $taskInput.value = '';
    $taskList.appendChild(newTaskElement);
    changeAlertInfo($taskId, $isInputEmpty);
  } else {
    changeAlertInfo($taskId, $isInputEmpty);
  }
}

const checkClick = function(e) {
  if (e.target.closest('button').classList.contains('complete')) {
    e.target.closest('div').previousElementSibling.previousElementSibling.classList.toggle('completed');
    e.target.closest('div').previousElementSibling.classList.toggle('done');
    e.target.closest('button').children[0].classList.toggle('btn-completed');
  } else if(e.target.closest('button').classList.contains('remove')) {
    const idElementToRemove =  e.target.closest('li').id;
    const taskList = e.target.closest('ul');
    const taskListLength = taskList.children.length
    // console.log(taskListLength);
    // console.log(taskList.childNodes[2]);


    for (let i = 0; i < taskListLength; i++) {
      if (taskListLength === 1) {
        taskList.innerHTML = '';
        $alertInfo.style.display = 'block';
        $alertInfo.textContent = `List is empty.`;
        $alertInfo.style.color = 'black';
      } else if (taskList.children[i].id === idElementToRemove) {
        taskList.removeChild(taskList.children[i]);
      }
    }
  } else if (e.target.closest('button').classList.contains('edit')) {
    const liTask = e.target.closest('li');
    $tempTaskIdToChangeContens = liTask.id
    $wrapperDiv.classList.toggle('wrapper-blur');
    $editWindowWrapperDiv.style.display = 'flex';
  }
}


const checkClickInsideEditWindow = function(e) {
    if (e.target.closest('button').classList.contains('change-task-submit-btn')) {
      let newTaskContents = $newTaskContentsInput.value;
      const idToChangeContentInside = document.getElementById($tempTaskIdToChangeContens);
      idToChangeContentInside.children[0].textContent = newTaskContents;
      $wrapperDiv.classList.toggle('wrapper-blur');
      $editWindowWrapperDiv.style.display = 'none';
      $newTaskContentsInput.value = '';
    }
}

const loadDOMElements = function() {
  $wrapperDiv = document.querySelector('.wrapper');
  $taskInput = document.querySelector('#task-input');
  $newTaskContentsInput = document.querySelector('#change-task-input');
  $taskSumbmitionBtn = document.getElementById('task-submit-btn');
  $alertInfo = document.querySelector('#alert-info');
  $taskList = document.querySelector('.task-list');
  $taskCheckButton = document.querySelector('.fa-check');
  $editWindowWrapperDiv = document.querySelector('.edit-window-popup-wrapper');
  $changeTaskInsideEditBtn = document.querySelector('.change-task-submit-btn');
};

const loadDOMEvents = function() {
  $taskSumbmitionBtn.addEventListener('click', addNewTask);
  $taskList.addEventListener('click', checkClick);
  $changeTaskInsideEditBtn.addEventListener('click', checkClickInsideEditWindow);
};

const main = function() {
  loadDOMElements();
  loadDOMEvents();
}


document.addEventListener('DOMContentLoaded', main);


