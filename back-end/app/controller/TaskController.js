'use strict'

const { Router } = require('express')
const HTTPStatus = require('http-status')

const TaskService = require('../Service/TaskService')

class TaskController {
  constructor() {
    this._router = new Router()
    this._taskService = new TaskService()
  }

  static IntermediateRoute() {
		return '/task'
  }

  createRouters() {
    this._insert()
    this._getTasksByProject()
    this._check()

		return this._router
  }

  _insert() {
    this._router.post('/insert', async (req, res) => {
      try {
        const result = await this._taskService.insert(req.body)

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }

  _check() {
    this._router.post('/check', async (req, res) => {
      try {
        const result = await this._taskService.check(req.body)

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }

  _getTasksByProject() {
    this._router.get('/getTasksByProject', async (req, res) => {
      try {
        const result = await this._taskService.getTasksByProject(req.query)

        res.json(result)
      } catch (e) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e)
      }
    })
  }

}

module.exports =  TaskController
