const Express = require('express')
const BodyParser = require('body-parser')

const ProjectController = require('./controller/ProjectController')
const TaskController = require('./controller/TaskController')
const Environment = require('./config/Environment.json')

class App {
  constructor() {
    this._express = new Express()
    this._projectController = new ProjectController()
    this._taskController = new TaskController()
  }

  init() {
    this._startExpress()
  }

  _startExpress() {
    this._setupExpress()
    this._express.use(ProjectController.IntermediateRoute(), this._projectController.createRouters())
    this._express.use(TaskController.IntermediateRoute(), this._taskController.createRouters())
    this._startListen()
  }

  _setupExpress() {
    this._express.use(BodyParser.json())
  }

  _startListen() {
		this._express.listen(Environment.port, () => {
			console.info(`Listening on port ${Environment.port}!`)
		})
	}
}

module.exports = App
