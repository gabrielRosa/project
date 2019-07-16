'use strict'

process.on('unhandledRejection', reason => {
	console.log('Unhandled Rejection at:', reason.stack || reason)
})


const App = require('./app/App')

new App().init()
