import TaskOptionsUI from './TaskOptionsUI'
import TaskPopupUI from './TaskPopupUI'
import Storage from './Storage'
import NavUI from './NavUI'
import Task from './Task'
import Icon from './Icon'
import './style.css'

const $background = document.querySelector('body')
$background.addEventListener('dblclick', () => console.log(Storage.getTasksList()))

export default class MainUI {
  static initItems = () => {
    const $createTask = document.querySelector('[data-create-task-button]')
    const $taskInput = document.querySelector('[data-create-task-text]')
    const $taskContainer = document.querySelector('[data-task-container]')
    const $taskForm = document.querySelector('[data-create-task]')
    const $curtain = document.querySelector('.curtain')
    $taskContainer.addEventListener('click', MainUI.handleTask)
    $curtain.addEventListener('transitionend', () => $curtain.remove())
    $createTask.addEventListener('click', MainUI.toggleCreateTask)
    $taskForm.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        $taskInput.value = null
        MainUI.toggleCreateTask(false)
      }
    })
    $taskForm.addEventListener('submit', e => {
      e.preventDefault()
      if ($taskInput.value === '') return
      else MainUI.addTask($taskInput)
    })
    if (!localStorage.getItem('tasks')) Storage.initSampleTasks()
    TaskOptionsUI.initItems()
    TaskPopupUI.initItems()
    MainUI.renderTasks()
    NavUI.initItems()
    // Storage.save()
  }

  static toggleCreateTask = bool => {
    const classListText = document.querySelector('[data-create-task]').classList
    const classListNav = document.querySelector('[data-task-container]').classList
    if (!bool) {
      classListText.remove('create-task--show')
      classListNav.remove('tasks--offset')
      return
    }
    classListText.toggle('create-task--show')
    classListNav.toggle('tasks--offset')
    TaskOptionsUI.toggleDateInput()
  }

  static changeHeaderText = text => {
    document.querySelector('[data-main-header]').textContent = text
  }

  static changeHeaderIcon = icon => {
    Icon.append('afterbegin', document.querySelector('[data-main-header]'), Icon[icon])
  }

  static updateMain = e => {
    MainUI.changeHeaderText(e.target.textContent)
    MainUI.changeHeaderIcon(e.target.dataset.navItem)
    NavUI.setCurrList(e.target.dataset.navItem)
    MainUI.renderTasks()
  }

  static addTask = $input => {
    const $date = document.querySelector('[data-date-input]')
    Storage.addTask(new Task(Date.now(), $input.value, null, $date.value, TaskOptionsUI.getCurrPriority(), null, null, false))
    TaskOptionsUI.toggleDateInput()
    TaskOptionsUI.resetPriority()
    // MainUI.toggleCreateTask(false)
    $input.value = null
  }

  static renderTasks = () => {
    const $container = document.querySelector('[data-task-container]')
    $container.innerHTML = null
    NavUI.getCurrList().forEach(task => {
      const { id, title } = task
      const taskHtml = `
      <li id="${id}">
        <label class="tasks__label" data-task-item>
          <input type="checkbox" name="tasks__label">
          <span class="tasks__checkbox"></span>
        </label>
        <p class="tasks__text">${title}</p>
        <div class="tasks__line-through"></div>
        <div class="tasks__delete">
          <button></button>
        </div>
      </li>`
      $container.insertAdjacentHTML('beforeend', taskHtml)
      MainUI.initTask(task)
    })
  }

  static initTask = task => {
    const $task = document.querySelector(`li[id="${task.id}"]`)
    const lineClassList = $task.querySelector('div').classList
    const textClassList = $task.querySelector('p').classList
    const $checkbox = $task.querySelector('span')
    const $delete = $task.querySelector('button')
    const $input = $task.querySelector('input')
    if (task.isDone) {
      lineClassList.add('tasks__line-through--show')
      textClassList.add('tasks__text--checked')
    }
    $input.addEventListener('change', e => {
      lineClassList.toggle('tasks__line-through--show', e.target.checked)
      textClassList.toggle('tasks__text--checked', e.target.checked)
    })
    $input.checked = task.isDone
    MainUI.setTaskPriority(task, $checkbox)
    Icon.append('afterbegin', $delete, Icon.Cross)
    Icon.append('afterbegin', $checkbox, Icon.Check)
  }

  static handleTask(e) {
    const task = Storage.findTask(Number(e.target.closest('li').id))
    if (e.target.tagName === 'P') TaskPopupUI.toggleElement(task)
    if (e.target.tagName === 'BUTTON') {
      Storage.deleteTask(task.id)
      TaskPopupUI.toggleElement(task, 'del')
    }
    if (e.target.tagName === 'INPUT') {
      task.isDone = e.target.checked
      Storage.save()
    }
  }

  static setTaskPriority = (task, check) => {
    switch (task.priority) {
      case 'blue':
        check.classList.add('tasks__checkbox--blue')
        break
      case 'yellow':
        check.classList.add('tasks__checkbox--yellow')
        break
      case 'red':
        check.classList.add('tasks__checkbox--red')
        break
    }
  }
}
MainUI.toggleCreateTask(true)
