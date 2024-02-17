import TaskOptionsUI from './TaskOptionsUI'
import Storage from './Storage'
import MainUI from './MainUI'
import * as dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import Icon from './Icon'
dayjs.extend(isBetween)
dayjs.extend(isToday)

export default class NavUI {
  static initItems = () => {
    const $nav = document.querySelector('[data-nav]')
    const $createButton = document.querySelector('[data-new-list]')
    const $createCategory = document.querySelector('[data-new-list-category]')
    const $modal = document.querySelector('dialog')
    $modal.addEventListener('click', e => {
      const dialogDimensions = $modal.getBoundingClientRect()
      // prettier-ignore
      if (e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom) {
        $modal.close()
      }
    })
    $createCategory.addEventListener('click', NavUI.newCategory)
    $createButton.addEventListener('click', NavUI.toggleCreateItemMenu)
    $nav.addEventListener('click', e => {
      if (e.target.tagName !== 'LI') return
      if (!e.target.hasAttribute('data-custom-nav')) NavUI.selectItem(e)
      else NavUI.selectCustomItem(e)
      if (e.target.tagName === 'BUTTON') NavUI.createItem()
    })
    NavUI.renderItems()
  }

  static renderItems = () => {
    Storage.getCustomItems().forEach(item => {
      const $container = document.querySelector('[data-custom-lists]')
      const { id, title } = item
      const itemHtml = `
    <li class="custom-nav__category" data-nav-item="Category" data-category-id="${id}" data-custom-nav>${title}</li`
      $container.insertAdjacentHTML('beforeend', itemHtml)
      NavUI.initItem(item)
    })
  }

  static initItem = item => {
    const $item = document.querySelector(`[data-category-id="${item.id}"]`)
    Icon.append('afterbegin', $item, Icon.Category)
  }

  static setList = list => (NavUI.list = list)

  static getList = () => {
    TaskOptionsUI.handleDate()
    if (typeof NavUI.list === 'number') {
      return Storage.getTasksList().filter(task => task.category === NavUI.list)
    }
    switch (NavUI.list) {
      case 'Today':
        return Storage.getTasksList().filter(task => {
          if (!task.date) return false
          return dayjs(task.date).isToday()
        })
      case 'All_tasks':
        return Storage.getTasksList()
      case 'Someday':
        return Storage.getTasksList().filter(task => task.date === '')
      case 'Next_7_days':
        return Storage.getTasksList().filter(task => {
          if (!task.date) return false
          const nextWeek = dayjs().add(6, 'day')
          return dayjs(task.date).isBetween(dayjs(), nextWeek)
        })
      default:
        return Storage.getTasksList()
    }
  }

  static selectItem = e => {
    const $nav = document.querySelector('[data-nav]')
    const $navItems = $nav.querySelectorAll('li')
    $navItems.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e, false)
  }

  static selectCustomItem = e => {
    const $nav = document.querySelector('[data-nav]')
    const $navItems = $nav.querySelectorAll('li')
    $navItems.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e, true)
  }

  static toggleCreateItemMenu = bool => {
    const classList = document.querySelector('[data-new-list-menu]').classList
    if (bool === true) return classList.add('new-list__menu--show')
    else if (bool === false) return classList.remove('new-list__menu--show')
    classList.toggle('new-list__menu--show')
  }

  static newCategory = () => {
    const $modal = document.querySelector('[data-create-category-modal]')
    $modal.showModal()
  }

  static createItem = () => {}

  static list = 'Today'
}
