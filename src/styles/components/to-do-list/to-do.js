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
  EDIT_BUTTON: 'button__edit',
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
      this.todoIcon.classList.toggle('open')
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
        console.log(this.currentTasksStorage)
        this.addInput.value = ''
      }
    })

  }

  renderDoneTask(value) {
    const currentTaskItem = document.createElement('li');
    currentTaskItem.className = 'todo__current-item task-item';

    const currentTaskDoneButton = document.createElement('button');
    currentTaskDoneButton.className = 'todo__current-button button__done button done';
    currentTaskDoneButton.textContent = 'Done';

    const currentTaskLabel = document.createElement('div');
    currentTaskLabel.className = 'todo__current-label';

    const currentTaskInput = document.createElement('input');
    currentTaskInput.className = 'todo__current-input task-input edit-mode';
    currentTaskLabel.textContent = value;

    const currentTaskEditButton = document.createElement('button');
    currentTaskEditButton.className = 'todo__current-button button__edit button';
    currentTaskEditButton.textContent = 'Edit';

    const currentTaskSaveButton = document.createElement('button');
    currentTaskSaveButton.className = 'todo__current-button button__save button edit-mode save-done';
    currentTaskSaveButton.textContent = 'Save';

    const currentTaskDeleteButton = document.createElement('button');
    currentTaskDeleteButton.className = 'todo__current-button button__delete button delete-done';
    currentTaskDeleteButton.textContent = 'Delete';
    currentTaskItem.append(currentTaskDoneButton);
    currentTaskItem.append(currentTaskLabel);
    currentTaskItem.append(currentTaskInput);
    currentTaskItem.append(currentTaskEditButton);
    currentTaskItem.append(currentTaskSaveButton);
    currentTaskItem.append(currentTaskDeleteButton);
    this.currentDoneList.append(currentTaskItem);

    currentTaskEditButton.addEventListener('click', () => {
      currentTaskInput.value = currentTaskLabel.textContent
      currentTaskLabel.classList.add('edit-mode');
      currentTaskInput.classList.remove('edit-mode');
      currentTaskEditButton.classList.add('edit-mode');
      currentTaskSaveButton.classList.remove('edit-mode');
    })

    currentTaskSaveButton.addEventListener('click', () => {
      // const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      // // const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      // this.currentTasksStorage.splice(index, 1, `${currentTaskInput.value}`);


      const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      if (!currentTaskSaveButton.classList.contains('save-done')) {
        this.currentTasksStorage.splice(index, 1, `${currentTaskInput.value}`);
      } else if (currentTaskSaveButton.classList.contains('save-done')) {
        this.doneTasksStorage.splice(indexDone, 1, `${currentTaskInput.value}`);
      }


      currentTaskLabel.textContent = currentTaskInput.value
      console.log(this.currentTasksStorage)
      console.log(this.doneTasksStorage)
      currentTaskLabel.classList.remove('edit-mode');
      currentTaskInput.classList.add('edit-mode');
      currentTaskEditButton.classList.remove('edit-mode');
      currentTaskSaveButton.classList.add('edit-mode');
    })
    currentTaskDeleteButton.addEventListener('click', () => {
      const parentOfDeleteButton = currentTaskDeleteButton.parentNode;
      const parentOfNode = parentOfDeleteButton.parentNode;
      const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      if (!currentTaskDeleteButton.classList.contains('delete-done')) {
        this.currentTasksStorage.splice(index, 1);
      }
      if (currentTaskDeleteButton.classList.contains('delete-done')) {
        this.doneTasksStorage.splice(indexDone, 1);
      }
      console.log(this.currentTasksStorage, this.doneTasksStorage)
      parentOfNode.removeChild(parentOfDeleteButton);
    })

    currentTaskDoneButton.addEventListener('click', () => {
      const parentOfDoneButton = currentTaskDoneButton.parentNode;
      if (currentTaskDoneButton.classList.contains('done')) {
        currentTaskSaveButton.classList.remove('save-done')
        currentTaskDoneButton.classList.remove('done');
        currentTaskDeleteButton.classList.remove('delete-done');
        this.currentTodoList.appendChild(parentOfDoneButton)
        const index = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
        this.doneTasksStorage.splice(index, 1);
        this.currentTasksStorage.push(currentTaskLabel.textContent);
        console.log(this.doneTasksStorage)
      } else {
        this.currentDoneList.append(parentOfDoneButton);
        currentTaskDoneButton.classList.add('done');
        currentTaskDeleteButton.classList.add('delete-done');
        currentTaskSaveButton.classList.add('save-done');
        this.doneTasksStorage.push(currentTaskLabel.textContent);
        const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
        this.currentTasksStorage.splice(index, 1);
        console.log(this.doneTasksStorage)
      }
    })
  }

  renderNewTask(value) {
    const currentTaskItem = document.createElement('li');
    currentTaskItem.className = 'todo__current-item task-item';

    const currentTaskDoneButton = document.createElement('button');
    currentTaskDoneButton.className = 'todo__current-button button__done button';
    currentTaskDoneButton.textContent = 'Done';

    const currentTaskLabel = document.createElement('div');
    currentTaskLabel.className = 'todo__current-label';

    const currentTaskInput = document.createElement('input');
    currentTaskInput.className = 'todo__current-input task-input edit-mode';
    currentTaskLabel.textContent = value;

    const currentTaskEditButton = document.createElement('button');
    currentTaskEditButton.className = 'todo__current-button button__edit button';
    currentTaskEditButton.textContent = 'Edit';

    const currentTaskSaveButton = document.createElement('button');
    currentTaskSaveButton.className = 'todo__current-button button__save button edit-mode';
    currentTaskSaveButton.textContent = 'Save';

    const currentTaskDeleteButton = document.createElement('button');
    currentTaskDeleteButton.className = 'todo__current-button button__delete button';
    currentTaskDeleteButton.textContent = 'Delete';

    currentTaskItem.append(currentTaskDoneButton);
    currentTaskItem.append(currentTaskLabel);
    currentTaskItem.append(currentTaskInput);
    currentTaskItem.append(currentTaskEditButton);
    currentTaskItem.append(currentTaskSaveButton);
    currentTaskItem.append(currentTaskDeleteButton);
    this.currentTodoList.append(currentTaskItem);

    currentTaskEditButton.addEventListener('click', () => {
      currentTaskInput.value = currentTaskLabel.textContent
      currentTaskLabel.classList.add('edit-mode');
      currentTaskInput.classList.remove('edit-mode');
      currentTaskEditButton.classList.add('edit-mode');
      currentTaskSaveButton.classList.remove('edit-mode');
    })

    currentTaskSaveButton.addEventListener('click', () => {
      // const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      // // const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      // this.currentTasksStorage.splice(index, 1, `${currentTaskInput.value}`);


      const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      if (!currentTaskSaveButton.classList.contains('save-done')) {
        this.currentTasksStorage.splice(index, 1, `${currentTaskInput.value}`);
      } else if (currentTaskSaveButton.classList.contains('save-done')) {
        this.doneTasksStorage.splice(indexDone, 1, `${currentTaskInput.value}`);
      }


      currentTaskLabel.textContent = currentTaskInput.value
      console.log(this.currentTasksStorage)
      console.log(this.doneTasksStorage)
      currentTaskLabel.classList.remove('edit-mode');
      currentTaskInput.classList.add('edit-mode');
      currentTaskEditButton.classList.remove('edit-mode');
      currentTaskSaveButton.classList.add('edit-mode');
    })

    currentTaskDeleteButton.addEventListener('click', () => {
      const parentOfDeleteButton = currentTaskDeleteButton.parentNode;
      const parentOfNode = parentOfDeleteButton.parentNode;
      const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
      const indexDone = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
      if (!currentTaskDeleteButton.classList.contains('delete-done')) {
        this.currentTasksStorage.splice(index, 1);
      }
      if (currentTaskDeleteButton.classList.contains('delete-done')) {
        this.doneTasksStorage.splice(indexDone, 1);
      }
      console.log(this.currentTasksStorage, this.doneTasksStorage)
      parentOfNode.removeChild(parentOfDeleteButton);
    })

    currentTaskDoneButton.addEventListener('click', () => {
      const parentOfDoneButton = currentTaskDoneButton.parentNode;
      if (currentTaskDoneButton.classList.contains('done')) {
        currentTaskDoneButton.classList.remove('done');
        currentTaskDeleteButton.classList.remove('delete-done');
        currentTaskSaveButton.classList.remove('save-done')
        this.currentTodoList.appendChild(parentOfDoneButton)
        const index = this.doneTasksStorage.indexOf(currentTaskLabel.textContent);
        this.doneTasksStorage.splice(index, 1);
        this.currentTasksStorage.push(currentTaskLabel.textContent);
        console.log(this.doneTasksStorage)
      } else {
        this.currentDoneList.append(parentOfDoneButton);
        currentTaskDoneButton.classList.add('done');
        currentTaskDeleteButton.classList.add('delete-done');
        currentTaskSaveButton.classList.add('save-done');
        this.doneTasksStorage.push(currentTaskLabel.textContent);
        const index = this.currentTasksStorage.indexOf(currentTaskLabel.textContent);
        this.currentTasksStorage.splice(index, 1);
        console.log(this.doneTasksStorage)
      }
    })
  }

  localStorage() {

    if (JSON.parse(localStorage.getItem('currentTasks')).length !== 0 || localStorage.getItem('currentTasks') !== null) {
      this.currentTasksStorage = JSON.parse(localStorage.getItem('currentTasks'))
      this.currentTasksStorage.forEach(el => {
        this.renderNewTask(el);
      })
    }

    if (JSON.parse(localStorage.getItem('doneTasks')).length !== 0 ||localStorage.getItem('doneTasks') !== null ) {
      this.doneTasksStorage = JSON.parse(localStorage.getItem('doneTasks'))
      this.doneTasksStorage.forEach(el => {
        this.renderDoneTask(el);
      })
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem('currentTasks', JSON.stringify(this.currentTasksStorage));
      localStorage.setItem('doneTasks', JSON.stringify(this.doneTasksStorage));
    });
  }


}

const todo = new ToDo()
todo.todoContainerHandler();
todo.addNewTodoItem();
todo.localStorage();



