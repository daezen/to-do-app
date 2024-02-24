export default class Icon {
  static defaultColor = '#8a8b94'

  static append = (position, element, icon) => {
    if (element) element.insertAdjacentHTML(position, icon)
  }

  static Inbox = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
</svg>
`

  static Today = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
`

  static Next_7_days = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
`

  static All_tasks = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
</svg>
`

  static Cross = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
`

  static Someday = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
`

  static Plus = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
`

  static Check = `
<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  class="feather feather-check">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>
`

  static Calendar = `
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${Icon.defaultColor}">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
`

  static Label = `
<svg class="task-priority-svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--task-blue-clr)"
  data-color="blue">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>
`

  static DownArrow = `
<svg viewBox="0 0 24 24" fill="${Icon.defaultColor}" class="w-6 h-6">
  <path fill-rule="evenodd"
    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
    clip-rule="evenodd" />
</svg>
`

  static Category = `
<svg viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd"
    d="M17.925 7.425L12 10.85L6.075 7.425L12 4L17.925 7.425ZM3.2625 16.975C3.4375 17.275 3.68333 17.5167 4 17.7L11 21.725C11.3167 21.9083 11.65 22 12 22C12.35 22 12.6833 21.9083 13 21.725L20 17.7C20.3167 17.5167 20.5625 17.275 20.7375 16.975C20.9125 16.675 21 16.3417 21 15.975V8.025C21 7.65833 20.9125 7.325 20.7375 7.025C20.5625 6.725 20.3167 6.48333 20 6.3L13 2.275C12.6833 2.09167 12.35 2 12 2C11.65 2 11.3167 2.09167 11 2.275L4 6.3C3.68333 6.48333 3.4375 6.725 3.2625 7.025C3.0875 7.325 3 7.65833 3 8.025V15.975C3 16.3417 3.0875 16.675 3.2625 16.975ZM5 9.1L12 13L19 9.1V15.95L12 20L5 15.95V9.1Z"
    fill="${Icon.defaultColor}" />
</svg>
`

  static Circle0 = `
<svg viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle12_5 = `
<svg viewBox="0 0 24 24" fill="none">
  <path d="M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle25 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle37_5 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C13.78 3 15.5201 3.52784 17.0001 4.51677C18.4802 5.50571 19.6337 6.91131 20.3149 8.55585C20.9961 10.2004 21.1743 12.01 20.8271 13.7558C20.4798 15.5016 19.6226 17.1053 18.364 18.364L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle50 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle62_5 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C13.4801 3 14.9373 3.36501 16.2426 4.06271C17.5479 4.7604 18.6609 5.76924 19.4832 6.99987C20.3055 8.23049 20.8116 9.64491 20.9567 11.1178C21.1017 12.5908 20.8813 14.0768 20.3149 15.4442C19.7485 16.8115 18.8536 18.0182 17.7095 18.9571C16.5654 19.896 15.2074 20.5383 13.7558 20.8271C12.3042 21.1158 10.8038 21.0421 9.38744 20.6125C7.97111 20.1828 6.6826 19.4105 5.63604 18.364L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle75 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C13.78 3 15.5201 3.52784 17.0001 4.51677C18.4802 5.50571 19.6337 6.91131 20.3149 8.55585C20.9961 10.2004 21.1743 12.01 20.8271 13.7558C20.4798 15.5016 19.6226 17.1053 18.364 18.364C17.1053 19.6226 15.5016 20.4798 13.7558 20.8271C12.01 21.1743 10.2004 20.9961 8.55585 20.3149C6.91131 19.6337 5.50571 18.4802 4.51677 17.0001C3.52784 15.5201 3 13.78 3 12L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle87_5 = `
<svg viewBox="0 0 24 24" fill="none">
  <path
    d="M12 3C14.0822 3 16.1 3.72197 17.7095 5.04291C19.3191 6.36384 20.4209 8.202 20.8271 10.2442C21.2333 12.2864 20.9188 14.4062 19.9373 16.2426C18.9558 18.0789 17.3679 19.5181 15.4442 20.3149C13.5205 21.1117 11.38 21.2169 9.38744 20.6125C7.3949 20.008 5.67358 18.7314 4.51677 17.0001C3.35997 15.2688 2.83925 13.19 3.04334 11.1178C3.24743 9.04568 4.1637 7.10838 5.63604 5.63604L12 12L12 3Z"
    fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Circle100 = `
<svg viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" fill="${Icon.defaultColor}" />
  <circle cx="12" cy="12" r="9" transform="rotate(-90 12 12)" stroke="${Icon.defaultColor}" stroke-width="2" />
</svg>
`

  static Menu = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="${Icon.defaultColor}">
  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
</svg>`
}
// Header Icon
Icon.append('afterbegin', document.querySelector('[data-main-header]'), Icon.Today)
// Nav Inbox
Icon.append('afterbegin', document.querySelector('[data-nav-item="Inbox"]'), Icon.Inbox)
// Nav Today
Icon.append('afterbegin', document.querySelector('[data-nav-item="Today"]'), Icon.Today)
// Nav Next 7 days
Icon.append('afterbegin', document.querySelector('[data-nav-item="Next_7_days"]'), Icon.Next_7_days)
// Nav All Tasks
Icon.append('afterbegin', document.querySelector('[data-nav-item="All_tasks"]'), Icon.All_tasks)
// Nav Someday
Icon.append('afterbegin', document.querySelector('[data-nav-item="Someday"]'), Icon.Someday)
// Create Lists Button
Icon.append('afterbegin', document.querySelector('[data-new-list]'), Icon.Plus)
// Create Tasks Button
Icon.append('afterbegin', document.querySelector('[data-create-task-button]'), Icon.Plus)
// Create Task Nav Calendar
Icon.append('afterend', document.querySelector('.task-date-input__date-input'), Icon.Calendar)
// Create Task Nav Priority
Icon.append('afterbegin', document.querySelector('.task-nav__priority'), Icon.Label)
// Create Task Nav Place Task
Icon.append('afterbegin', document.querySelector('[data-sumbit-task]'), Icon.DownArrow)
// Close Task Description
Icon.append('afterbegin', document.querySelector('[data-close-task-description]'), Icon.Cross)
// Task Description Label
Icon.append('afterbegin', document.querySelector('[data-task-description-priority]'), Icon.Label)
// Nav Custom Category
Icon.append('afterbegin', document.querySelector('.custom-nav__category'), Icon.Category)
// Nav Custom Item
Icon.append('afterbegin', document.querySelector('.custom-nav__item'), Icon.Circle0)
// Create Custom Category
Icon.append('afterbegin', document.querySelector('.new-list__category'), Icon.Category)
// Create Custom Item
Icon.append('afterbegin', document.querySelector('.new-list__list'), Icon.Circle0)
// Modal Close
Icon.append('afterbegin', document.querySelector('.create-category-modal__close').firstElementChild, Icon.Cross)
