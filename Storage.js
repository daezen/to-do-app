import Category from './Category'
import * as dayjs from 'dayjs'
import MainUI from './MainUI'
import Task from './Task'

export default class Storage {
  static initSampleTasks = () => {
    Storage.addTask(new Task(1, 'Finish the to do app', `Learn the skills required to be able to make a to-do app`, dayjs().format('YYYY-MM-DD'), 'red', null, null, true))
    Storage.addTask(
      new Task(2, 'Reach the end of thought', `HealthyGamer's advise about getting away from external stimuli...`, dayjs().add(5, 'day').format('YYYY-MM-DD'), 'yellow', null, null, false)
    )
    Storage.addTask(new Task(3, 'This task has no due date', `Task used as a placeholder to check if the someday category works`, '', 'blue', null, null, false))
    Storage.addTask(new Task(4, 'Sample category task', 'Sample task to check if this is working', dayjs().add(2, 'day'), 'blue', 1, null, false))
  }

  static loadTasks = () => {
    return JSON.parse(localStorage.getItem('tasks'))?.map(task => {
      return Object.assign(new Task(), task)
    })
  }

  static addTask = task => {
    Storage.taskList.push(task)
    Storage.saveTasks()
    MainUI.renderTasks()
  }

  static checkTast = (id, bool) => {
    const task = Storage.taskList.find(task => id === task.id)
    task.isDone = bool
    Storage.saveTasks()
  }

  static deleteTask = id => {
    const task = Storage.taskList.findIndex(task => id === task.id)
    Storage.taskList.splice(task, 1)
    Storage.saveTasks()
    MainUI.renderTasks()
  }

  static findTask = id => {
    return Storage.taskList.find(task => id === task.id)
  }

  static initSampleItems = () => {
    Storage.addItem(new Category(1, 'Sample category'))
    Storage.addItem(new Category(2, '2nd sample'))
  }

  static loadItems = () => {
    return JSON.parse(localStorage.getItem('items'))?.map(item => {
      return Object.assign(new Category(), item)
    })
  }

  static addItem = item => {
    Storage.customItems.push(item)
    Storage.saveItems()
  }

  static findItem = id => {
    return Storage.customItems.find(item => id === item.id)
  }

  static saveTasks = () => localStorage.setItem('tasks', JSON.stringify(Storage.taskList))
  static saveItems = () => localStorage.setItem('items', JSON.stringify(Storage.customItems))
  static customItems = Storage.loadItems() || []
  static taskList = Storage.loadTasks() || []
  static getTasksList = () => Storage.taskList
  static getCustomItems = () => Storage.customItems
}
