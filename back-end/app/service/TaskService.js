'use strict'

const TaskDAO = require('../dao/TaskDAO')
const Exception = require('../exception/Exception')

class TaskService {
  constructor() {
    this._taskDAO = new TaskDAO()
  }

  async deleteByProjectId({ id = Exception.isRequired('id') }) {
    return await this._taskDAO.deleteByProjectId(id)
  }

  async insert({ 
    description = Exception.isRequired('description'),
    owner = Exception.isRequired('owner'),
    dueDate = Exception.isRequired('dueDate'),
    project = Exception.isRequired('project'),
    checked = false,
   }) {
    return await this._taskDAO.insert(description, owner, dueDate, project, checked)
  }

  async getTasksByProject({ 
    project = Exception.isRequired('project')
   }) {
    return await this._taskDAO.getTasksByProject(project)
  }

  async check({ 
    id = Exception.isRequired('id')
   }) {
    return await this._taskDAO.check(id)
  }
}

module.exports = TaskService
