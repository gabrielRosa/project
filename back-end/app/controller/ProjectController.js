'use strict'

const { Router } = require('express')
const HTTPStatus = require('http-status')

const ProjectService = require('../Service/ProjectService')
const TaskService = require('../Service/TaskService')

class ProjectController {
	constructor() {
    this._router = new Router()
    this._projectService = new ProjectService()
    this._taskService = new TaskService()
  }

  static IntermediateRoute() {
		return '/project'
  }

  createRouters() {
		this._insert()
		this._delete()
		this._getAll()

		return this._router
  }

  _insert() {
    this._router.post('/insert', async (req, res) => {
      try {
        const result = await this._projectService.insert(req.body)

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }

  _getAll() {
    this._router.get('/all', async (req, res) => {
      try {
        const result = await this._projectService.getAll()

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }

  _delete() {
    this._router.delete('/delete/:id', async (req, res) => {
      try {
        const taskResult = await this._taskService.deleteByProjectId(req.params)
        let result = false

        if (taskResult) {
          result = await this._projectService.delete(req.params)
        }

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }
}

module.exports =  ProjectController
