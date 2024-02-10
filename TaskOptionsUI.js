import MainUI from './MainUI'
import NavUI from './NavUI'

export default class TaskOptionsUI {
  static $dateToggle = document.querySelector('[data-task-date-check]')

  static getTodayDateFormatted = bool => {
    let today = new Date()
    if (bool) today.setDate(today.getDate() + 6)
    let year = today.getFullYear()
    let month = (today.getMonth() + 1).toString().padStart(2, '0')
    let day = today.getDate().toString().padStart(2, '0')
    let formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

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
      $svg.innerHTML = `
<path stroke-linecap="round" stroke-linejoin="round"
d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />`
    } else $svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`
  }

  static handleDate = () => {
    const $date = document.querySelector('[data-task-date-input]')
    switch (NavUI.list) {
      case 'Today':
        $date.value = TaskOptionsUI.getTodayDateFormatted()
        break
      case 'Next_7_days':
        $date.value = TaskOptionsUI.getTodayDateFormatted(true)
        break
      default:
        $date.value = ''
    }
    $date.setAttribute('min', TaskOptionsUI.getTodayDateFormatted())
  }

  static resetPriority = () => {
    const $dummyCheck = document.querySelector('.create-task__dummycheck')
    const $prioritySvg = document.querySelector('.task-priority-svg')
    $prioritySvg.dataset.color = 'blue'
    $dummyCheck.style.borderColor = ''
    $prioritySvg.style.stroke = ''
  }

  static handlePriority = e => {
    const classList = document.querySelector('.task-nav__priority-menu').classList
    const $prioritySvg = document.querySelector('.task-priority-svg')
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
