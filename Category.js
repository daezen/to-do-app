export default class Category {
  constructor(id, title) {
    this._id = id
    this._title = title
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
}
