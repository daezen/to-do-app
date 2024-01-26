import MainUI from './MainUI'
import Task from './Task'

export default class Storage {
  static TaskList = JSON.parse(localStorage.getItem('tasks')) || [
    {
      id: 1,
      title: 'Finish the to do app',
      description: `Learn the skills required to be able to make a to-do app`,
      dueDate: new Date(),
      priority: 'red',
      isDone: true,
    },
    {
      id: 2,
      title: 'Reach the end of thought',
      description: `HealthyGamer's advise about getting away from external stimuli...`,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      priority: 'yellow',
      isDone: false,
    },
    {
      id: 3,
      title: 'This task has no due date',
      description: `Task used as a placeholder to check if the someday category works`,
      dueDate: '',
      priority: 'blue',
      isDone: false,
    },
  ]

  static save = () => localStorage.setItem('tasks', JSON.stringify(Storage.TaskList))

  static addTask = (id, title, desc, date, priority) => {
    Storage.TaskList.push(new Task(id, title, desc, date, priority))
    Storage.save()
    MainUI.renderTasks()
  }

  static checkTast = e => {
    const task = Storage.TaskList.find(task => Number(e.target.id) === task.id)
    task.isDone = e.target.checked
    Storage.save()
  }

  static deleteTask = e => {
    const task = Storage.TaskList.findIndex(task => Number(e.target.id) === task.id)
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
