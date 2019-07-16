import { Request } from '../utils/request';

export const TaskService = {
  async getTasksByProject(id) {
    const { response } = await Request.get('/task/getTasksByProject', { project: id });

    return response;
  },

  async check(id) {
    const { response } = await Request.post('/task/check', { id });

    return response;
  },

  async create(description, owner, dueDate, project) {
    const { response } = await Request.post('/task/insert', { description, owner, dueDate, project });

    return response;
  }
}