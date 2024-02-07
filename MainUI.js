import TaskOptionsUI from './TaskOptionsUI'
import TaskPopupUI from './TaskPopupUI'
import Storage from './Storage'
import NavUI from './NavUI'
import Icon from './Icon'
import './style.css'

export default class MainUI {
  static initItems = () => {
    const $createTask = document.querySelector('[data-create-task-button]')
    const $taskText = document.querySelector('[data-create-task-text]')
    const $taskForm = document.querySelector('[data-create-task]')
    const $curtain = document.querySelector('.curtain')
    $curtain.addEventListener('transitionend', () => $curtain.remove())
    $createTask.addEventListener('click', MainUI.toggleCreateTask)
    $taskForm.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        $taskText.value = null
        MainUI.toggleCreateTask(false)
      }
    })
    $taskForm.addEventListener('submit', e => {
      e.preventDefault()
      if ($taskText.value === '') return
      else MainUI.addTask($taskText)
    })
    TaskOptionsUI.initItems()
    TaskPopupUI.initItems()
    MainUI.renderTasks()
    NavUI.initItems()
    Storage.save()
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

  static addTask = text => {
    const $date = document.querySelector('[data-date-input]')
    // id, title, desc, date, priority, category, item
    Storage.addTask(Date.now(), text.value, null, new Date($date.value), TaskOptionsUI.getCurrPriority(), null, null)
    TaskOptionsUI.toggleDateInput()
    TaskOptionsUI.resetPriority()
    MainUI.toggleCreateTask(false)
    text.value = null
  }

  static renderTasks = () => {
    const $taskContainer = document.querySelector('[data-task-container]')
    $taskContainer.innerHTML = null
    NavUI.getCurrList().forEach(task => {
      const taskHtml = `
            <li id="${task.id}">
              <label class="tasks__label" data-task-item>
                <input type="checkbox" id="${task.id}">
                <span class="tasks__checkbox"></span>
              </label>
              <p class="tasks__text">${task.title}</p>
              <div class="tasks__line-through"></div>
              <div class="tasks__delete">
                <button></button>
              </div>
            </li>`
      $taskContainer.insertAdjacentHTML('beforeend', taskHtml)
      MainUI.initTask(task)
    })
  }

  static initTask = task => {
    const $task = document.querySelector(`li[id="${task.id}"]`)
    const $checkbox = $task.querySelector('span')
    const $delete = $task.querySelector('button')
    const $input = $task.querySelector('input')
    const $line = $task.querySelector('div')
    const $text = $task.querySelector('p')
    $text.addEventListener('click', MainUI.handleTaskText)
    if (task.isDone) {
      $text.classList.add('tasks__text--checked')
      $line.classList.add('tasks__line-through--show')
    }
    $delete.addEventListener('click', Storage.deleteTask)
    $input.addEventListener('change', e => {
      $text.classList.toggle('tasks__text--checked')
      $line.classList.toggle('tasks__line-through--show')
      Storage.checkTast(Number(e.target.id), e.target.checked)
    })
    $input.checked = task.isDone
    MainUI.setTaskPriority(task, $checkbox)
    Icon.append('afterbegin', $delete, Icon.Cross)
    Icon.append('afterbegin', $checkbox, Icon.Check)
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

  static handleTaskText = e => TaskPopupUI.toggleElement(e)
}

MainUI.toggleCreateTask(true)
