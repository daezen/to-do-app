import NavUI from './NavUI.js'
import Storage from './Storage.js'
import Icon from './Icon.js'
import List from './List.js'

export default class NavModal {
  static isCategory = false

  static initItems = () => {
    const $modal = document.querySelector('dialog')
    const $close = document.querySelector('[data-modal-close]')
    const $dropdown = document.querySelector('.modal-dropdown')
    const $newList = document.querySelector('[data-new-list-item]')
    const $menu = document.querySelector('.create-category-modal__menu')
    const $newCategory = document.querySelector('[data-new-list-category]')
    const $categoriesList = document.querySelector('.modal-dropdown__lists')

    $newCategory.addEventListener('click', () => NavModal.updateModal(true))
    $newList.addEventListener('click', () => NavModal.updateModal(false))
    $close.addEventListener('click', () => NavModal.toggleModal(false))
    $dropdown.addEventListener('click', NavModal.toggleDropdown)
    $menu.addEventListener('submit', NavModal.handleSubmit)

    $categoriesList.addEventListener('click', e => {
      if (e.target.tagName === 'DIV') return
      let id = Number(e.target.dataset.categoryId)

      NavModal.selectCategory(id, e.target.textContent)
    })

    $modal.addEventListener(
      'mousedown',
      ({ target: $, clientX: x, clientY: y }) => {
        const { left, right, top, bottom } = $modal.getBoundingClientRect()

        if ($.tagName === 'P' || $.tagName === 'DIV') return
        if (x < left || x > right || y < top || y > bottom) {
          NavModal.toggleModal(false)
        }
      },
    )

    $dropdown.addEventListener('animationend', () =>
      $dropdown.classList.remove('show'),
    )
  }

  static handleSubmit = e => {
    e.preventDefault()
    const $menu = document.querySelector('.create-category-modal__menu')
    const $input = document.querySelector('.create-category-modal__name')
    const $dropdown = document.querySelector('.modal-dropdown')
    let id = Number($menu.dataset.id)

    if ($input.value === '') return
    if (id === 0 && !NavModal.isCategory) return $dropdown.classList.add('show')

    NavModal.newList(id, $input.value)
    NavModal.toggleModal(false)
  }

  static newList = (id, text) => {
    if (NavModal.isCategory)
      Storage.addList(new List(Date.now(), text, 'category', Date.now()))

    if (!NavModal.isCategory)
      Storage.addList(new List(id, text, 'list', Date.now()))
  }

  static toggleModal = show => {
    const $input = document.querySelector('.create-category-modal__name')
    const $modal = document.querySelector('dialog')

    if (show) {
      $input.value = ''
      $modal.showModal()
    }

    if (!show) {
      NavModal.toggleDropdown(false)
      $modal.close()
    }
  }

  static toggleDropdown = show => {
    const classList = document.querySelector('.modal-dropdown__lists').classList

    if (show === false) {
      NavModal.selectCategory(0, null)
      return classList.remove('modal-dropdown__lists--show')
    }

    classList.toggle('modal-dropdown__lists--show')
  }

  static updateModal = isCategory => {
    const $input = document.querySelector('.create-category-modal__name')
    const $dropdown = document.querySelector('.modal-dropdown')

    if (isCategory === true) {
      NavModal.isCategory = true
      $dropdown.style.display = 'none'
      $input.setAttribute('placeholder', 'Add category name')
    }

    if (isCategory === false) {
      NavModal.isCategory = false
      $dropdown.removeAttribute('style')
      $input.setAttribute('placeholder', 'Add list name')
    }

    NavModal.renderCategories()
    NavModal.toggleModal(true)
    NavUI.toggleCreateListMenu(false)
  }

  static selectCategory = (id, text) => {
    const $menu = document.querySelector('.create-category-modal__menu')
    const $button = document.querySelector('.modal-dropdown__open')

    if (id === 0) return ($button.textContent = 'Choose a category')

    $button.textContent = text
    $menu.dataset.id = id

    Icon.append('afterbegin', $button, Icon.Category)
  }

  static renderCategories = () => {
    const $categories = document.querySelector('.modal-dropdown__lists')
    $categories.innerHTML = '<p data-category-id="">Choose a category</p>'

    Storage.getCustomLists()
      .filter(list => list.type === 'category')
      .forEach(category => {
        let listHtml = `<p data-category-id="${category.id}">${category.title}</p>`

        $categories.insertAdjacentHTML('beforeend', listHtml)
        const $category = document.querySelector(
          `p[data-category-id="${category.id}"]`,
        )

        Icon.append('afterbegin', $category, Icon.Category)
      })
  }
}
