'use strict'

class Exception {

  static isRequired(item) {
		throw new Error(`The param "${item}" is required`)
	}

}
