const db = require('./util/db');

module.exports = {
  async find(params) {
    console.log('find');
    return [];
  },
  async get(id, params) {
    console.log('get');
  },
  async create(data, params) {
    console.log('create');
  },
  async update(id, data, params) {
    console.log('update');
  },
  async patch(id, data, params) {
    console.log('patch');
  },
  async remove(id, params) {
    console.log('remove');
  },
  setup(app, path) {
    console.log('setup');
  }
};
