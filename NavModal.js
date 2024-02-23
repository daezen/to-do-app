import NavUI from './NavUI'
import Storage from './Storage'
import Icon from './Icon'
import List from './List'

export default class NavModal {
  static initItems = () => {
    const $modal = document.querySelector('dialog')
    const $modalDropdown = document.querySelector('.modal-dropdown')
    const $modalCloseButton = document.querySelector('[data-modal-close]')
    const $modalDropdownOpen = document.querySelector('.modal-dropdown__open')
    const $modalInput = document.querySelector('.create-category-modal__name')
    const $modalCategoriesList = document.querySelector('.modal-dropdown__lists')
    const $modalContinue = document.querySelector('[data-modal-continue]')
    const $newList = document.querySelector('[data-new-list-menu]')
    $newList.addEventListener('click', e => NavModal.newList(e, $modalInput))
    $modalCloseButton.addEventListener('click', () => $modal.close())
    $modalDropdown.addEventListener('click', e => {
      if (e.target.classList.contains('modal-dropdown__lists')) return
      $modalCategoriesList.classList.toggle('modal-dropdown__lists--show')
    })
    $modal.addEventListener('click', e => {
      const dialogDimensions = $modal.getBoundingClientRect()
      const $modalPlaceholder = document.querySelector('.create-category-modal__name')
      if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
        $modalCategoriesList.classList.remove('modal-dropdown__lists--show')
        $modalPlaceholder.value = null
        $modal.close()
      }
    })
    $modalContinue.addEventListener('click', e => {
      let isCategory = e.target.hasAttribute('data-new-list-category')
      if ($modalInput.value === '') return
      if (isCategory) Storage.addList(new List(Date.now(), $modalInput.value, 'category', null))
      if (!isCategory) {
        let categoryId = Number($modalDropdownOpen.dataset.id)
        Storage.addList(new List(categoryId, $modalInput.value, 'list', Date.now()))
      }
      $modal.close()
    })
    $modalCategoriesList.addEventListener('click', NavModal.selectCategory)
  }

  static newList = (e, input) => {
    const $modalDropdown = document.querySelector('.modal-dropdown')
    const $modal = document.querySelector('[data-create-category-modal]')
    if (e.target.tagName !== 'BUTTON') return
    let isCategory = e.target.hasAttribute('data-new-list-category')
    if (isCategory) {
      input.setAttribute('placeholder', 'Add category name')
      $modalDropdown.style.display = 'none'
    } else if (!isCategory) {
      input.setAttribute('placeholder', 'Add list name')
      $modalDropdown.style.display = ''
      NavModal.renderCategories()
    } else return '?'
    NavUI.toggleCreateListMenu(false)
    $modal.showModal()
  }

  static selectCategory = e => {
    const $modalDropdownOpen = document.querySelector('.modal-dropdown__open')
    if (e.target.tagName !== 'P') return
    $modalDropdownOpen.dataset.id = e.target.dataset.categoryId
    $modalDropdownOpen.textContent = e.target.textContent
    Icon.append('afterbegin', $modalDropdownOpen, Icon.Category)
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
