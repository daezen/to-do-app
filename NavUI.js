import TaskOptionsUI from './TaskOptionsUI.js'
import Storage from './Storage.js'
import MainUI from './MainUI.js'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween.js'
import isToday from 'dayjs/plugin/isToday.js'
import Icon from './Icon.js'
import NavModal from './NavModal.js'
dayjs.extend(isBetween)
dayjs.extend(isToday)

export default class NavUI {
  static list = 'Today'

  static initItems = () => {
    const $nav = document.querySelector('[data-nav]')
    const $newList = document.querySelector('[data-new-list]')
    $newList.addEventListener('click', NavUI.toggleCreateListMenu)
    $nav.addEventListener('click', e => {
      if (e.target.tagName !== 'LI') return
      if (!e.target.hasAttribute('data-custom-nav')) NavUI.selectItem(e)
      else NavUI.selectCustomItem(e)
    })
    $nav.addEventListener('contextmenu', ContextMenu.show)
    NavUI.renderLists()
    NavModal.initItems()
    ContextMenu.init()
  }

  static renderLists = () => {
    const $container = document.querySelector('[data-custom-lists]')
    $container.innerHTML = null
    Storage.getCustomLists()
      .filter(category => category.type === 'category')
      .forEach(category => {
        const categoryHtml = `
    <li class="custom-nav__category" data-nav-item="Category" data-category-id="${category.id}" data-uid="${category.uid}" data-custom-nav>${category.title}</li>`
        $container.insertAdjacentHTML('beforeend', categoryHtml)
        Storage.getCustomLists()
          .filter(list => list.id === category.id && list.type === 'list')
          .forEach(list => {
            const listHtml = `
        <li class="custom-nav__item" data-nav-item="Circle0" data-list-id="${list.id}" data-uid="${list.uid}" data-custom-nav>${list.title}</li>`
            $container.insertAdjacentHTML('beforeend', listHtml)
            NavUI.initList(list)
          })
        NavUI.initCategory(category)
      })
  }

  static initCategory = category => {
    const $category = document.querySelector(`li[data-category-id="${category.id}"]`)
    Icon.append('afterbegin', $category, Icon.Category)
  }

  static initList = list => {
    const $list = document.querySelector(`li[data-uid="${list.uid}"]`)
    Icon.append('afterbegin', $list, Icon.Circle0)
  }

  static setList = list => (NavUI.list = list)

  static getList = () => {
    TaskOptionsUI.handleDate()
    if (Array.isArray(NavUI.list) && NavUI.list[1]) {
      return Storage.getTasksList().filter(task => task.category === NavUI.list[0])
    } else if (Array.isArray(NavUI.list) && !NavUI.list[1]) {
      return Storage.getTasksList().filter(task => task.list === NavUI.list[0])
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
        return null
    }
  }

  static selectItem = e => {
    const $nav = document.querySelector('[data-nav]')
    const $navItems = $nav.querySelectorAll('li')
    MainUI.list = null
    $navItems.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e, false)
  }

  static selectCustomItem = e => {
    const $nav = document.querySelector('[data-nav]')
    const $navItems = $nav.querySelectorAll('li')
    let uid = Number(e.target.dataset.uid)
    $navItems.forEach(item => item.classList.remove('nav__item--selected'))
    e.target.classList.add('nav__item--selected')
    MainUI.updateMain(e, true)
    MainUI.list = Storage.findList(uid)
  }

  static toggleCreateListMenu = show => {
    const classList = document.querySelector('[data-new-list-menu]').classList
    if (show === true) return classList.add('new-list__menu--show')
    else if (show === false) return classList.remove('new-list__menu--show')
    classList.toggle('new-list__menu--show')
  }
}

class ContextMenu {
  static list = {}

  static init = () => {
    const $menu = document.querySelector('.ctx-menu')
    const $del = document.querySelector('.ctx-menu__del')
    window.addEventListener('click', e => {
      $menu.style.visibility = 'hidden'
    })
    $del.addEventListener('click', ContextMenu.delete)
  }

  static show = e => {
    e.preventDefault()
    const $menu = document.querySelector('.ctx-menu')
    let isCategory = e.target.hasAttribute('data-category-id')
    let isList = e.target.hasAttribute('data-list-id')
    if (isCategory || isList) {
      $menu.style.left = `${e.clientX}px`
      $menu.style.top = `${e.clientY}px`
      $menu.style.visibility = 'visible'
    }
    if (isCategory) {
      ContextMenu.list.type = 'category'
      ContextMenu.list.id = Number(e.target.dataset.categoryId)
    }
    if (isList) {
      ContextMenu.list.type = 'list'
      ContextMenu.list.id = Number(e.target.dataset.uid)
    }
  }

  static delete = () => {
    if (ContextMenu.list.type === 'category') {
      Storage.getCustomLists()
        .filter(list => ContextMenu.list.id === list.id)
        .forEach(list => Storage.deleteList(list.uid))
    }
    if (ContextMenu.list.type === 'list') Storage.deleteList(ContextMenu.list.id)
  }
}
