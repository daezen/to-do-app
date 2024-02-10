import * as dayjs from 'dayjs'
import MainUI from './MainUI'
import Task from './Task'

export default class Storage {
  static initSampleTasks = () => {
    Storage.addTask(new Task(1, 'Finish the to do app', `Learn the skills required to be able to make a to-do app`, dayjs().format('YYYY-MM-DD'), 'red', 'Category', 'Item', true))
    Storage.addTask(
      new Task(2, 'Reach the end of thought', `HealthyGamer's advise about getting away from external stimuli...`, dayjs().add(5, 'day').format('YYYY-MM-DD'), 'yellow', 'Category', 'Item', false)
    )
    Storage.addTask(new Task(3, 'This task has no due date', `Task used as a placeholder to check if the someday category works`, '', 'blue', null, null, false))
  }

  static loadTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))?.map(task => {
      return Object.assign(new Task(), task)
    })
    return tasks
  }

  static TaskList = Storage.loadTask() || []

  static save = () => localStorage.setItem('tasks', JSON.stringify(Storage.TaskList))

  static addTask = task => {
    Storage.TaskList.push(task)
    Storage.save()
    MainUI.renderTasks()
  }

  static checkTast = (id, bool) => {
    const task = Storage.TaskList.find(task => id === task.id)
    task.isDone = bool
    Storage.save()
  }

  static deleteTask = id => {
    const task = Storage.TaskList.findIndex(task => id === task.id)
    Storage.TaskList.splice(task, 1)
    Storage.save()
    MainUI.renderTasks()
  }

  static findTask = id => {
    const task = Storage.TaskList.find(task => id === task.id)
    return task
  }

  static getTasksList = () => Storage.TaskList
}
