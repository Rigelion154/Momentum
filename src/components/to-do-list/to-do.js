const CssClasses = {
  ADD_ITEM: 'todo__add-input',
  ADD_BUTTON: 'todo__add-button',
  POPUP: 'popup',
  TODO_CONTAINER: 'todo',
  TODO__ICON: 'todo-icon',
  SETTINGS_BUTTON: 'settings',
  OPEN: 'open',
  TODO_LIST: 'todo__current-list',
  DONE_LIST: 'todo__done-list',
  EDIT_MODE: 'edit-mode',
  DONE: 'done',
  DELETE_DONE: 'delete-done',
  SAVE_DONE: 'save-done',
}

class ToDo {
  constructor() {
    this.addInput = document.querySelector(`.${CssClasses.ADD_ITEM}`);
    this.addButton = document.querySelector(`.${CssClasses.ADD_BUTTON}`);
    this.popup = document.querySelector(`.${CssClasses.POPUP}`);
    this.todoContainer = document.querySelector(`.${CssClasses.TODO_CONTAINER}`);
    this.todoIcon = document.querySelector(`.${CssClasses.TODO__ICON}`);
    this.settingsButton = document.querySelector(`.${CssClasses.SETTINGS_BUTTON}`);
    this.currentTodoList = document.querySelector(`.${CssClasses.TODO_LIST}`);
    this.currentDoneList = document.querySelector(`.${CssClasses.DONE_LIST}`);
    this.currentTasksStorage = []
    this.doneTasksStorage = []
  }

  todoContainerHandler() {
    this.todoIcon.addEventListener('click', () => {
      this.todoIcon.classList.toggle(CssClasses.OPEN)
      this.todoContainer.classList.toggle(CssClasses.OPEN)
      this.popup.classList.toggle(CssClasses.OPEN)
      this.settingsButton.classList.remove(CssClasses.OPEN)
    })
    this.popup.addEventListener('click', () => {
      this.popup.classList.toggle(CssClasses.OPEN)
      this.todoContainer.classList.toggle(CssClasses.OPEN)
      this.todoIcon.classList.toggle(CssClasses.OPEN)
    })
  }

  addNewTodoItem() {
    this.addButton.addEventListener('click', () => {
      if (this.addInput.value) {
        this.renderNewTask(this.addInput.value)
        this.currentTasksStorage.push(this.addInput.value)
        localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
        console.log(this.currentTasksStorage)
        this.addInput.value = ''
      }
    })
  }

  renderDoneTask(value) {
    this.currentDoneList.innerHTML += `
      <li class="todo__current-item task-item">
        <button class="todo__current-button button__done button done">Done</button>
        <div class="todo__current-label">${value}</div>
        <input class="todo__current-input task-input edit-mode">
        <button class="todo__current-button button__edit button">Edit</button>
        <button class="todo__current-button button__save button edit-mode save-done">Save</button>
        <button class="todo__current-button button__delete button delete-done">Delete</button>
      </li>`
  }

  renderNewTask(value) {
    this.currentTodoList.innerHTML += `
   <li class="todo__current-item task-item">
      <button class="todo__current-button button__done button">Done</button>
      <div class="todo__current-label">${value}</div>
      <input class="todo__current-input task-input edit-mode">
      <button class="todo__current-button button__edit button">Edit</button>
      <button class="todo__current-button button__save button edit-mode">Save</button>
      <button class="todo__current-button button__delete button">Delete</button>
   </li>`;
  }

  TaskButtonsHandler() {
    this.todoContainer.addEventListener('click', (e) => {
      const done = Array.from(e.target.parentNode.children)[0]
      const label = Array.from(e.target.parentNode.children)[1]
      const input = Array.from(e.target.parentNode.children)[2]
      const edit = Array.from(e.target.parentNode.children)[3]
      const save = Array.from(e.target.parentNode.children)[4]
      const del = Array.from(e.target.parentNode.children)[5]

      if (e.target.closest('.button__edit')) {
        input.value = label.textContent
        label.classList.add(CssClasses.EDIT_MODE)
        input.classList.remove(CssClasses.EDIT_MODE)
        edit.classList.add(CssClasses.EDIT_MODE);
        save.classList.remove(CssClasses.EDIT_MODE);
      }

      if (e.target.closest('.button__done')) {
        const index = this.currentTasksStorage.indexOf(label.textContent);
        const indexDone = this.doneTasksStorage.indexOf(label.textContent);
        const parentOfDoneButton = done.parentNode;
        if (done.classList.contains(CssClasses.DONE)) {
          this.currentTodoList.appendChild(parentOfDoneButton)
          done.classList.remove(CssClasses.DONE);
          del.classList.remove(CssClasses.DELETE_DONE);
          save.classList.remove(CssClasses.SAVE_DONE)
          this.doneTasksStorage.splice(indexDone, 1);
          localStorage.setItem('doneTasks', JSON.stringify(this.doneTasksStorage));
          this.currentTasksStorage.push(label.textContent);
          localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
          console.log(this.doneTasksStorage)
        } else {
          this.currentDoneList.append(parentOfDoneButton)
          done.classList.add(CssClasses.DONE);
          del.classList.add(CssClasses.DELETE_DONE);
          save.classList.add(CssClasses.SAVE_DONE)
          this.doneTasksStorage.push(label.textContent);
          localStorage.setItem('doneTasks', JSON.stringify(this.doneTasksStorage));
          this.currentTasksStorage.splice(index, 1);
          localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
          console.log(this.doneTasksStorage)
        }
      }

      if (e.target.closest('.button__save')) {
        const index = this.currentTasksStorage.indexOf(label.textContent);
        const indexDone = this.doneTasksStorage.indexOf(label.textContent);
        if (!save.classList.contains(CssClasses.SAVE_DONE)) {
          this.currentTasksStorage.splice(index, 1, `${input.value}`);
          localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
        } else if (save.classList.contains(CssClasses.SAVE_DONE)) {
          this.doneTasksStorage.splice(indexDone, 1, `${input.value}`);
          localStorage.setItem('doneTasks', JSON.stringify(this.doneTasksStorage));
        }
        label.textContent = input.value
        console.log(this.currentTasksStorage)
        console.log(this.doneTasksStorage)
        label.classList.remove(CssClasses.EDIT_MODE);
        input.classList.add(CssClasses.EDIT_MODE);
        edit.classList.remove(CssClasses.EDIT_MODE);
        save.classList.add(CssClasses.EDIT_MODE);
      }

      if (e.target.closest('.button__delete')) {
        const parentOfDeleteButton = del.parentNode;
        const parentOfNode = parentOfDeleteButton.parentNode;
        const index = this.currentTasksStorage.indexOf(label.textContent);
        const indexDone = this.doneTasksStorage.indexOf(label.textContent);
        if (!del.classList.contains(CssClasses.DELETE_DONE)) {
          this.currentTasksStorage.splice(index, 1);
          localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
        }
        if (del.classList.contains(CssClasses.DELETE_DONE)) {
          this.doneTasksStorage.splice(indexDone, 1);
          localStorage.setItem('doneTasks', JSON.stringify(this.doneTasksStorage));
        }
        console.log(this.currentTasksStorage, this.doneTasksStorage)
        parentOfNode.removeChild(parentOfDeleteButton);
      }
    })
  }

  localStorage() {
    if (localStorage.getItem('currentTasks') !== null) {
      this.currentTasksStorage = JSON.parse(localStorage.getItem('currentTasks'))
      this.currentTasksStorage.forEach(el => {
        this.renderNewTask(el);
      })
    }
    if (localStorage.getItem('doneTasks') !== null) {
      this.doneTasksStorage = JSON.parse(localStorage.getItem('doneTasks'))
      this.doneTasksStorage.forEach(el => {
        this.renderDoneTask(el);
      })
    }
  }
}

const todo = new ToDo()
todo.todoContainerHandler();
todo.addNewTodoItem();
todo.localStorage();
todo.TaskButtonsHandler();



