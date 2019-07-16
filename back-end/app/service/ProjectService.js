'use strict'

const ProjectDAO = require('../dao/ProjectDAO')
const Exception = require('../exception/Exception')

class ProjectService {
  constructor() {
    this._projectDAO = new ProjectDAO()
  }

  async insert({ name = Exception.isRequired('name') }) {
    return await this._projectDAO.insert(name)
  }

  async deleteByProjectId({ id = Exception.isRequired('id') }) {
    return await this._projectDAO.deleteByProjectId(id)
  }

  async getAll() {
    return await this._projectDAO.getAll()
  }

  async delete({ id = Exception.isRequired('id') }) {
    return await this._projectDAO.delete(id)
  }
}

module.exports = ProjectService
