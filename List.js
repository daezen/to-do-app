export default class List {
  constructor(id, title, type, uid) {
    this._id = id
    this._title = title
    this._type = type
    this._uid = uid
  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }

  get title() {
    return this._title
  }

  set title(title) {
    this._title = title
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  get uid() {
    return this._uid
  }

  set uid(uid) {
    this._uid = uid
  }
}
