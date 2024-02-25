import MainUI from './MainUI.js'
import NavUI from './NavUI.js'
import dayjs from 'dayjs'
import List from './List.js'
import Task from './Task.js'

export default class Storage {
  static initSampleTasks = () => {
    Storage.addTask(new Task(1, 'Finish the to do app', `Learn the skills required to be able to make a to-do app`, dayjs().format('YYYY-MM-DD'), 'red', 1, 3, true))
    Storage.addTask(
      new Task(2, 'Reach the end of thought', `HealthyGamer's advise about getting away from external stimuli...`, dayjs().add(5, 'day').format('YYYY-MM-DD'), 'yellow', null, null, false)
    )
    Storage.addTask(new Task(3, 'This task has no due date', `Task used as a placeholder to check if the someday category works`, '', 'blue', 2, 4, false))
    Storage.addTask(new Task(4, 'Sample category task', 'Sample task to check if this is working', dayjs().add(2, 'day'), 'blue', 1, null, false))
  }

  static initSampleLists = () => {
    Storage.addList(new List(1, 'Coding', 'category', 1))
    Storage.addList(new List(2, 'Work', 'category', 2))
    Storage.addList(new List(1, 'Projects', 'list', 3))
    Storage.addList(new List(2, 'Duties', 'list', 4))
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

  static checkTask = (id, isDone) => {
    const task = Storage.taskList.find(task => id === task.id)
    task.isDone = isDone
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

  static loadLists = () => {
    return JSON.parse(localStorage.getItem('lists'))?.map(item => {
      return Object.assign(new List(), item)
    })
  }

  static addList = list => {
    Storage.customLists.push(list)
    Storage.saveLists()
    NavUI.renderLists()
  }

  static findList = id => {
    return Storage.customLists.find(list => id === list.uid)
  }

  static deleteList = id => {
    const list = Storage.customLists.findIndex(list => id === list.uid)
    Storage.customLists.splice(list, 1)
    Storage.saveLists()
    NavUI.renderLists()
  }

  static saveTasks = () => localStorage.setItem('tasks', JSON.stringify(Storage.taskList))
  static saveLists = () => localStorage.setItem('lists', JSON.stringify(Storage.customLists))
  static customLists = Storage.loadLists() || []
  static taskList = Storage.loadTasks() || []
  static getTasksList = () => Storage.taskList
  static getCustomLists = () => Storage.customLists
}
