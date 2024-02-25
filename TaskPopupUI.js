import Storage from './Storage.js'
import MainUI from './MainUI.js'
import dayjs from 'dayjs'

export default class TaskPopupUI {
  static initItems = () => {
    const $date = document.querySelector('[data-task-description-date]')
    const $title = document.querySelector('[data-task-description-title]')
    const $close = document.querySelector('[data-close-task-description]')
    const $description = document.querySelector('[data-task-description-textarea]')
    const $priority = document.querySelector('[data-task-description-priority]')
    $priority.addEventListener('click', TaskPopupUI.handlePriority)
    $date.addEventListener('change', () => TaskPopupUI.updateTask($title, $description, $date))
    $title.addEventListener('keyup', () => TaskPopupUI.updateTask($title, $description, $date))
    $description.addEventListener('keyup', () => TaskPopupUI.updateTask($title, $description, $date))
    $close.addEventListener('click', _ => TaskPopupUI.toggleElement(_, 'close'))
  }

  static toggleElement = (task, btn) => {
    const classList = document.querySelector('[data-task-description]').classList
    const $title = document.querySelector('[data-task-description-title]')
    if (btn === 'close') return classList.remove('task-description--show')
    if (!classList.contains('task-description--show')) classList.add('task-description--show')
    TaskPopupUI.updateHtml(task)
  }

  static updateHtml = task => {
    const $article = document.querySelector('[data-task-description]')
    const $date = document.querySelector('[data-task-description-date]')
    const $title = document.querySelector('[data-task-description-title]')
    const $priority = document.querySelector('.task-description__priority-menu')
    const $description = document.querySelector('[data-task-description-textarea]')
    const $prioritySvg = document.querySelector('[data-task-description-priority]').firstElementChild
    let date = ''
    if (task.date) date = dayjs(task.date).format('YYYY-MM-DD')
    $article.id = task.id
    $title.textContent = task.title
    $description.textContent = task.description
    $date.value = date
    $priority.classList.remove('task-description__priority-menu--show')
    switch (task.priority) {
      case 'red':
        $prioritySvg.dataset.color = 'red'
        $prioritySvg.style.stroke = 'var(--task-red-clr)'
        $title.style.textDecorationColor = 'var(--task-red-clr)'
        break
      case 'yellow':
        $prioritySvg.dataset.color = 'yellow'
        $prioritySvg.style.stroke = 'var(--task-yellow-clr)'
        $title.style.textDecorationColor = 'var(--task-yellow-clr)'
        break
      case 'blue':
        $prioritySvg.dataset.color = 'blue'
        $prioritySvg.style.stroke = ''
        $title.style.textDecorationColor = ''
        break
      default:
        $prioritySvg.dataset.color = 'blue'
        $prioritySvg.style.stroke = ''
        $title.style.textDecorationColor = ''
    }
    $date.setAttribute('min', dayjs().format('YYYY-MM-DD'))
  }

  static updateTask = (title, desc, date) => {
    const $article = document.querySelector('[data-task-description]')
    const task = Storage.getTasksList().find(task => Number($article.id) === task.id)
    task.date = dayjs(date.value).format('YYYY-MM-DD')
    task.description = desc.textContent
    task.title = title.textContent
    Storage.saveTasks()
    MainUI.renderTasks()
  }

  static handlePriority = e => {
    const $article = document.querySelector('[data-task-description]')
    const task = Storage.getTasksList().find(task => Number($article.id) === task.id)
    const $priorityMenu = document.querySelector('.task-description__priority-menu')
    const $prioritySvg = document.querySelector('[data-task-description-priority]').firstElementChild
    $priorityMenu.classList.toggle('task-description__priority-menu--show')
    if (e.target.dataset.color) {
      switch (e.target.dataset.color) {
        case 'red':
          $prioritySvg.dataset.color = 'red'
          $prioritySvg.style.stroke = 'var(--task-red-clr)'
          task.priority = 'red'
          break
        case 'yellow':
          $prioritySvg.dataset.color = 'yellow'
          $prioritySvg.style.stroke = 'var(--task-yellow-clr)'
          task.priority = 'yellow'
          break
        case 'blue':
          $prioritySvg.dataset.color = 'blue'
          $prioritySvg.style.stroke = ''
          task.priority = 'blue'
          break
        default:
          $prioritySvg.style.stroke = ''
          task.priority = 'blue'
      }
    }
    Storage.saveTasks()
    MainUI.renderTasks()
  }
}
