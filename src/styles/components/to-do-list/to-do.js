const CssClasses = {
  ADD_ITEM: 'todo__add-input',
  ADD_BUTTON: 'todo__add-button',
  POPUP: 'popup',
  TODO_CONTAINER: 'todo',
  TODO__ICON: 'todo-icon',
  SETTINGS_BUTTON: 'settings',
  OPEN: 'open',
  TODO_LIST: 'todo__current-list',
  EDIT_BUTTON: 'button__edit',
}

class ToDo {
  constructor() {
    this.addInput = document.querySelector(`.${CssClasses.ADD_ITEM}`);
    this.addButton = document.querySelector(`.${CssClasses.ADD_BUTTON}`);
    this.editButton = document.querySelector(`.${CssClasses.EDIT_BUTTON}`);
    this.popup = document.querySelector(`.${CssClasses.POPUP}`);
    this.todoContainer = document.querySelector(`.${CssClasses.TODO_CONTAINER}`);
    this.todoIcon = document.querySelector(`.${CssClasses.TODO__ICON}`);
    this.settingsButton = document.querySelector(`.${CssClasses.SETTINGS_BUTTON}`);
    this.currentTodoList = document.querySelector(`.${CssClasses.TODO_LIST}`);
    this.currentTasksStorage = []
  }

  todoContainerHandler() {
    this.todoIcon.addEventListener('click', () => {
      this.todoContainer.classList.toggle(CssClasses.OPEN)
      this.popup.classList.toggle(CssClasses.OPEN)
      this.settingsButton.classList.remove(CssClasses.OPEN)
    })
    this.popup.addEventListener('click', () => {
      this.popup.classList.toggle(CssClasses.OPEN)
      this.todoContainer.classList.toggle(CssClasses.OPEN)
    })
  }

  addNewTodoItem() {
    this.addButton.addEventListener('click', () => {
      if (this.addInput.value) {
        this.renderNewTask(this.addInput.value)
        this.currentTasksStorage.push(this.addInput.value)
        this.addInput.value = ''
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
      currentTaskInput.style.width = `${currentTaskLabel.offsetWidth}px`;
      console.log(`${currentTaskLabel.offsetWidth}px`)
      currentTaskInput.value = currentTaskLabel.textContent
      currentTaskLabel.classList.add('edit-mode');
      currentTaskInput.classList.remove('edit-mode');
      currentTaskEditButton.classList.add('edit-mode');
      currentTaskSaveButton.classList.remove('edit-mode');
    })

    currentTaskSaveButton.addEventListener('click', () => {
      currentTaskLabel.textContent = currentTaskInput.value
      currentTaskLabel.classList.remove('edit-mode');
      currentTaskInput.classList.add('edit-mode');
      currentTaskEditButton.classList.remove('edit-mode');
      currentTaskSaveButton.classList.add('edit-mode');
    })
    currentTaskDeleteButton.addEventListener('click', () => {
      const parentOfDeleteButton = currentTaskDeleteButton.parentNode;
      const parentOfNode = parentOfDeleteButton.parentNode;
      parentOfNode.removeChild(parentOfDeleteButton);
    })

  }

}

const todo = new ToDo()
todo.todoContainerHandler();
todo.addNewTodoItem();

// window.addEventListener('click', (e) => {
//   console.log(e.target)
//
// })