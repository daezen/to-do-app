import TaskOptionsUI from './TaskOptionsUI'
import Storage from './Storage'
import MainUI from './MainUI'
import * as dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isBetween)
dayjs.extend(isToday)

export default class NavUI {
  static initItems = () => {
    const navElem = document.querySelector('[data-nav]')
    const navItems = navElem.querySelectorAll('li')
    navElem.addEventListener('click', e => {
      if (e.target.tagName === 'LI') NavUI.updateSelectedNavItem(e, navItems)
    })
  }

  static list = 'Today'

  static setCurrList = list => (NavUI.list = list)

  static getCurrList = () => {
    TaskOptionsUI.handleDate()
    switch (NavUI.list) {
      case 'Today':
        return Storage.getTasksList().filter(task => {
          if (!task.date) return false
          return dayjs(task.date).isToday()
        })
      case 'All_tasks':
        return Storage.getTasksList()
      case 'Someday':
        return Storage.getTasksList().filter(task => task.dueDate === '')
      case 'Next_7_days':
        return Storage.getTasksList().filter(task => {
          if (!task.date) return false
          const today = dayjs()
          const nextWeek = today.add(6, 'day')
          return dayjs(task.date).isBetween(today, nextWeek)
        })
      default:
        return Storage.getTasksList()
    }
  }

  static updateSelectedNavItem = (e, items) => {
    items.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e)
  }
}
