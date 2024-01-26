import TaskOptionsUI from './TaskOptionsUI'
import Storage from './Storage'
import MainUI from './MainUI'

export default class TaskPopupUI {
  static initItems = () => {
    const $date = document.querySelector('[data-task-description-date]')
    const $title = document.querySelector('[data-task-description-title]')
    const $close = document.querySelector('[data-close-task-description]')
    const $description = document.querySelector('[data-task-description-textarea]')
    const $priority = document.querySelector('[data-task-description-priority]')
    $priority.addEventListener('click', TaskPopupUI.handlePriority)
    $date.addEventListener('change', e => TaskPopupUI.updateTask($title, $description, $date))
    $title.addEventListener('keyup', () => TaskPopupUI.updateTask($title, $description, $date))
    $description.addEventListener('keyup', () => TaskPopupUI.updateTask($title, $description, $date))
    $close.addEventListener('click', e => TaskPopupUI.toggleElement(e, 'close'))
  }

  static toggleElement = (e, button) => {
    const classList = document.querySelector('[data-task-description]').classList
    const task = Storage.getTasksList().find(task => Number(e.target.parentElement.id) === task.id)
    if (button === 'close') return classList.remove('task-description--show')
    if (!classList.contains('task-description--show')) classList.add('task-description--show')
    TaskPopupUI.updateHtml(task)
  }

  static updateHtml = task => {
    const $article = document.querySelector('[data-task-description]')
    const $date = document.querySelector('[data-task-description-date]')
    const $title = document.querySelector('[data-task-description-title]')
    const $description = document.querySelector('[data-task-description-textarea]')
    const $prioritySvg = document.querySelector('[data-task-description-priority]').firstElementChild
    let date
    if (task.dueDate) date = new Date(task.dueDate).toISOString().slice(0, 10)
    if (task.priority === 'red') $title.style.textDecorationColor = 'var(--task-red-clr)'
    else if (task.priority === 'yellow') $title.style.textDecorationColor = 'var(--task-yellow-clr)'
    else $title.style.textDecorationColor = ''
    $article.id = task.id
    $title.textContent = task.title
    $description.textContent = task.description
    $date.value = `${date}`
    switch (task.priority) {
      case 'red':
        $prioritySvg.dataset.color = 'red'
        $prioritySvg.style.stroke = 'var(--task-red-clr)'
        break
      case 'yellow':
        $prioritySvg.dataset.color = 'yellow'
        $prioritySvg.style.stroke = 'var(--task-yellow-clr)'
        break
      case 'blue':
        $prioritySvg.dataset.color = 'blue'
        $prioritySvg.style.stroke = ''
        break
      default:
        $prioritySvg.style.stroke = ''
    }
    $date.setAttribute('min', TaskOptionsUI.getTodayDateFormatted())
  }

  static updateTask = (title, desc, date) => {
    const $article = document.querySelector('[data-task-description]')
    const task = Storage.getTasksList().find(task => Number($article.id) === task.id)
    task.dueDate = new Date(date.value).toLocaleString(navigator.language, { timeZone: 'UTC' })
    task.description = desc.textContent
    task.title = title.textContent
    Storage.save()
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
    Storage.save()
    MainUI.renderTasks()
  }
}
