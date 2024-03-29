export default class Task {
  constructor(id, title, description, dueDate, priority, category, list, isDone) {
    this.id = id
    this._title = title
    this._description = description
    this.dueDate = dueDate
    this._priority = priority
    this._category = category
    this._list = list
    this._isDone = isDone
  }
  get title() {
    return this._title
  }
  set title(title) {
    this._title = title
  }
  get description() {
    return this._description
  }
  set description(description) {
    this._description = description
  }
  get date() {
    return this.dueDate
  }
  set date(dueDate) {
    this.dueDate = dueDate
  }
  get priority() {
    return this._priority
  }
  set priority(priority) {
    this._priority = priority
  }
  get category() {
    return this._category
  }
  set category(category) {
    this._category = category
  }
  get list() {
    return this._list
  }
  set list(list) {
    this._list = list
  }
  get isDone() {
    return this._isDone
  }
  set isDone(isDone) {
    this._isDone = isDone
  }
}
