export default class Task {
  constructor(id, title, desc, date, priority, category, item) {
    this.id = id
    this.title = title
    this.description = desc
    this.dueDate = date.toLocaleString(navigator.language, { timeZone: 'UTC' })
    this.priority = priority
    this.category = category
    this.item = item
    this.isDone = false
  }
}
