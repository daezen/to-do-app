import TaskOptionsUI from './TaskOptionsUI'
import Storage from './Storage'
import MainUI from './MainUI'

export default class NavUI {
  static list = 'Today'

  static setCurrList = list => (NavUI.list = list)

  static getCurrList = () => {
    TaskOptionsUI.handleDate()
    switch (NavUI.list) {
      case 'Today':
        return Storage.getTasksList().filter(task => {
          if (!task.dueDate) return false
          const dueDate = new Date(task.dueDate)
          const today = new Date()
          // prettier-ignore
          return (
              dueDate.getDate() === today.getDate() && 
              dueDate.getMonth() === today.getMonth() && 
              dueDate.getFullYear() === today.getFullYear()
            )
        })
      case 'All_tasks':
        return Storage.getTasksList()
      case 'Someday':
        return Storage.getTasksList().filter(task => task.dueDate === '')
      case 'Next_7_days':
        return Storage.getTasksList().filter(task => {
          if (!task.dueDate) return false
          const dueDate = new Date(task.dueDate)
          const next7Days = new Date()
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          next7Days.setDate(next7Days.getDate() + 6)
          return dueDate >= today && dueDate <= next7Days
        })
      default:
        return Storage.getTasksList()
    }
  }

  static initItems = () => {
    const navElem = document.querySelector('[data-nav]')
    const navItems = navElem.querySelectorAll('li')
    navElem.addEventListener('click', e => {
      if (e.target.tagName === 'LI') NavUI.updateSelectedNavItem(e, navItems)
    })
  }

  static updateSelectedNavItem = (e, items) => {
    items.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e)
  }
}
