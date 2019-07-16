import { Request } from '../utils/request';

export const ProjectService = {
  async getAll() {
    const { response } = await Request.get('/project/all');

    return response;
  },

  async delete({ id }) {
    return await Request.delete('/project/delete', id);
  },

  async create(name) {
    return await Request.post('/project/insert', { name });
  }
}