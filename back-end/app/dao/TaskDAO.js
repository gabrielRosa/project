'use strict'

const query = require('../database/Database')

class TaskDAO {

  async insert(description, owner, dueDate, project, checked) {
    try {
      await query('INSERT INTO Task (Description, Owner, DtDue, ProjectId, Checked) VALUES (?, ?, ?, ?, ?)', [description, owner, dueDate, project, checked])

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }

  async deleteByProjectId(id) {
		try {
			await query('DELETE FROM Task WHERE ProjectId = (?)', [id])

			return true
		} catch (e) {
			console.error(e)

			return false
		}
  }
  
  async getTasksByProject(id) {
		try {
			const { results } = await query('SELECT TaskId, Description, Owner, DtDue, ProjectId, Checked FROM Task WHERE ProjectId = (?) ORDER BY DtDue ASC', [id])

			return results
		} catch (e) {
			console.error(e)

			return false
		}
	}

  async check(id) {
		try {
			const { results } = await query('UPDATE Task SET Checked = 1 WHERE TaskId = (?)', [id])

			return results
		} catch (e) {
			console.error(e)

			return false
		}
	}
}

module.exports = TaskDAO
