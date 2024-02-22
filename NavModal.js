import NavUI from './NavUI'
import Storage from './Storage'
import Icon from './Icon'
import List from './List'

export default class NavModal {
  static initItems = () => {
    const $modal = document.querySelector('dialog')
    const $modalDropdownOpen = document.querySelector('.modal-dropdown')
    const $modalCloseButton = document.querySelector('[data-modal-close]')
    const $modalDropdown = document.querySelector('.modal-dropdown__lists')
    const $newList = document.querySelector('[data-new-list-menu]')
    $newList.addEventListener('click', NavModal.newList)
    $modalCloseButton.addEventListener('click', () => $modal.close())
    $modalDropdownOpen.addEventListener('click', () => {
      $modalDropdown.classList.toggle('modal-dropdown__lists--show')
    })
    $modal.addEventListener('click', e => {
      const dialogDimensions = $modal.getBoundingClientRect()
      const $modalPlaceholder = document.querySelector('.create-category-modal__name')
      if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
        $modalDropdown.classList.remove('modal-dropdown__lists--show')
        $modalPlaceholder.value = null
        $modal.close()
      }
    })
  }

  static newList = e => {
    const $modalDropdown = document.querySelector('.modal-dropdown')
    const $modal = document.querySelector('[data-create-category-modal]')
    const $modalContinue = document.querySelector('[data-modal-continue]')
    const $modalInput = document.querySelector('.create-category-modal__name')
    let isCategory = e.target.hasAttribute('data-new-list-category')
    $modalContinue.addEventListener('click', () => {
      if ($modalInput.value === '') return
      if (isCategory) Storage.addList(new List(Date.now(), $modalInput.value, 'category', null))
      if (!isCategory) Storage.addList(new List(Date.now(), $modalInput.value, 'list', null))
      $modal.close()
      $modalInput.value = null
    })
    if (isCategory) {
      $modalInput.setAttribute('placeholder', 'Add category name')
      $modalDropdown.style.display = 'none'
    } else if (!isCategory) {
      $modalInput.setAttribute('placeholder', 'Add list name')
      $modalDropdown.style.display = ''
      NavModal.renderCategories()
    } else return '?'
    NavUI.toggleCreateListMenu(false)
    $modal.showModal()
  }

  static renderCategories = () => {
    const $categories = document.querySelector('.modal-dropdown__lists')
    $categories.innerHTML = null
    Storage.getCustomLists()
      .filter(list => list.type === 'category')
      .forEach(category => {
        let listHtml = `<p data-category-id="${category.id}">${category.title}</p>`
        $categories.insertAdjacentHTML('beforeend', listHtml)
        Icon.append('afterbegin', document.querySelector(`p[data-category-id="${category.id}"]`), Icon.Category)
      })
  }
}
