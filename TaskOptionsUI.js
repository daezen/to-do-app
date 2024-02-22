import Icon from './Icon'
import NavUI from './NavUI'
import * as dayjs from 'dayjs'

export default class TaskOptionsUI {
  static $dateToggle = document.querySelector('[data-task-date-check]')

  static initItems = () => {
    const $priority = document.querySelector('[data-task-priority]')
    TaskOptionsUI.$dateToggle.addEventListener('change', TaskOptionsUI.updateDateIcon)
    $priority.addEventListener('click', TaskOptionsUI.handlePriority)
    TaskOptionsUI.handleDate()
  }

  static toggleDateInput = bool => {
    TaskOptionsUI.$dateToggle.checked = false
    TaskOptionsUI.updateDateIcon()
  }

  static updateDateIcon = () => {
    const $svg = TaskOptionsUI.$dateToggle.parentElement.lastElementChild
    if (!TaskOptionsUI.$dateToggle.checked) {
      $svg.innerHTML = Icon.Calendar
    } else $svg.innerHTML = Icon.Cross
  }

  static handleDate = () => {
    const $date = document.querySelector('[data-task-date-input]')
    switch (NavUI.list) {
      case 'Today':
        $date.value = dayjs().format('YYYY-MM-DD')
        break
      case 'Next_7_days':
        $date.value = dayjs().add(6, 'day').format('YYYY-MM-DD')
        break
      default:
        $date.value = ''
    }
    $date.setAttribute('min', dayjs().format('YYYY-MM-DD'))
  }

  static resetPriority = () => {
    const $dummyCheck = document.querySelector('.create-task__dummycheck')
    const $prioritySvg = document.querySelector('.task-priority-svg')
    $prioritySvg.dataset.color = 'blue'
    $dummyCheck.style.borderColor = ''
    $prioritySvg.style.stroke = ''
  }

  static handlePriority = (e, isOpen) => {
    const classList = document.querySelector('.task-nav__priority-menu').classList
    const $prioritySvg = document.querySelector('.task-priority-svg')
    if (isOpen === false) classList.remove('task-nav__priority-menu--show')
    if (e === null) return
    classList.toggle('task-nav__priority-menu--show')
    if (e.target.dataset.color) {
      const $dummyCheck = document.querySelector('.create-task__dummycheck')
      switch (e.target.dataset.color) {
        case 'red':
          $prioritySvg.dataset.color = 'red'
          $prioritySvg.style.stroke = 'var(--task-red-clr)'
          $dummyCheck.style.borderColor = 'var(--task-red-clr)'
          break
        case 'yellow':
          $prioritySvg.dataset.color = 'yellow'
          $prioritySvg.style.stroke = 'var(--task-yellow-clr)'
          $dummyCheck.style.borderColor = 'var(--task-yellow-clr)'
          break
        case 'blue':
          $prioritySvg.dataset.color = 'blue'
          $prioritySvg.style.stroke = ''
          $dummyCheck.style.borderColor = ''
          break
        default:
          $prioritySvg.style.stroke = ''
      }
    }
  }
  static getCurrPriority = () => {
    const $prioritySvg = document.querySelector('.task-priority-svg')
    return $prioritySvg.dataset.color
  }
}
