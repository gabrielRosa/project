'use strict'

const query = require('../database/Database')

class ProjectDAO {

  async insert(name) {
    try {
      await query('INSERT INTO Project (name) VALUES (?)', [name])

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }

  async getAll() {
    try {
      const { results } = await query('SELECT ProjectId, Name FROM Project')

      return results
    } catch (e) {
      console.error(e)

      return false
    }
  }

  async delete(id) {
    try {
      await query('DELETE FROM Project WHERE ProjectId = (?)', [id])

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }
}

module.exports = ProjectDAO
