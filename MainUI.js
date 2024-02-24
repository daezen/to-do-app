import TaskOptionsUI from './TaskOptionsUI'
import TaskPopupUI from './TaskPopupUI'
import Storage from './Storage'
import NavUI from './NavUI'
import Task from './Task'
import Icon from './Icon'
import './style.css'

export default class MainUI {
  static list

  static initItems = () => {
    const $createTask = document.querySelector('[data-create-task-button]')
    const $taskContainer = document.querySelector('[data-task-container]')
    const $taskInput = document.querySelector('[data-create-task-text]')
    const $taskForm = document.querySelector('[data-create-task]')
    const $curtain = document.querySelector('.curtain')
    $taskContainer.addEventListener('click', MainUI.handleTask)
    $curtain.addEventListener('transitionend', () => $curtain.remove())
    $createTask.addEventListener('click', MainUI.toggleCreateTask)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        MainUI.toggleCreateTask(false)
        $taskInput.value = null
      }
      if (e.altKey && e.key === 'n') MainUI.toggleCreateTask()
    })
    $taskForm.addEventListener('submit', e => {
      e.preventDefault()
      if ($taskInput.value === '') return
      else MainUI.addTask($taskInput)
    })
    if (!localStorage.getItem('tasks')) Storage.initSampleTasks()
    if (!localStorage.getItem('lists')) Storage.initSampleLists()
    TaskOptionsUI.initItems()
    TaskPopupUI.initItems()
    MainUI.renderTasks()
    NavUI.initItems()
    // Storage.save()
  }

  static toggleCreateTask = show => {
    const classListText = document.querySelector('[data-create-task]').classList
    const classListNav = document.querySelector('[data-task-container]').classList
    const $input = document.querySelector('[data-create-task-text]')
    let isOpen = classListText.contains('create-task--show')
    if (show === false) {
      classListText.remove('create-task--show')
      classListNav.remove('tasks--offset')
      isOpen = false
      return
    }
    TaskOptionsUI.toggleDateInput()
    if (isOpen) {
      classListNav.remove('tasks--offset')
      classListText.remove('create-task--show')
      $input.blur()
      TaskOptionsUI.handlePriority(null, false)
    } else if (!isOpen) {
      classListNav.add('tasks--offset')
      classListText.add('create-task--show')
      $input.focus()
    }
  }

  static changeHeaderText = text => (document.querySelector('[data-main-header]').textContent = text)

  static changeHeaderIcon = icon => Icon.append('afterbegin', document.querySelector('[data-main-header]'), Icon[icon])

  static updateMain = (e, isCustomList) => {
    MainUI.changeHeaderText(e.target.textContent)
    MainUI.changeHeaderIcon(e.target.dataset.navItem)
    let isCategory = e.target.hasAttribute('data-category-id')
    if (isCustomList === false) NavUI.setList(e.target.dataset.navItem)
    if (isCustomList === true) {
      if (isCategory) NavUI.setList([Number(e.target.dataset.categoryId), isCategory])
      else NavUI.setList([Number(e.target.dataset.uid), isCategory])
    }
    MainUI.renderTasks()
  }

  static addTask = $input => {
    const $date = document.querySelector('[data-date-input]')
    const list = MainUI.list
    if (list) Storage.addTask(new Task(Date.now(), $input.value, null, $date.value, TaskOptionsUI.getCurrPriority(), list.id, list.uid, false))
    else Storage.addTask(new Task(Date.now(), $input.value, null, $date.value, TaskOptionsUI.getCurrPriority(), null, null, false))
    TaskOptionsUI.toggleDateInput()
    TaskOptionsUI.resetPriority()
    $input.value = null
  }

  static renderTasks = () => {
    const $container = document.querySelector('[data-task-container]')
    $container.innerHTML = null
    NavUI.getList().forEach(task => {
      const { id, title } = task
      const taskHtml = `
  <li data-task="${id}">
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
    const $task = document.querySelector(`[data-task="${task.id}"`)
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
    const task = Storage.findTask(Number(e.target.closest('li').dataset.task))
    const id = Number(e.target.closest('li').dataset.task)
    if (e.target.tagName === 'P') TaskPopupUI.toggleElement(task)
    if (e.target.tagName === 'BUTTON') Storage.deleteTask(task.id)
    if (e.target.tagName === 'INPUT') Storage.checkTask(id, e.target.checked)
  }

  static setTaskPriority = (task, check) => {
    if (task.priority === 'blue') return check.classList.add('tasks__checkbox--blue')
    if (task.priority === 'yellow') return check.classList.add('tasks__checkbox--yellow')
    if (task.priority === 'red') return check.classList.add('tasks__checkbox--red')
  }
}
