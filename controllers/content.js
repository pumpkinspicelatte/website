const table = require('../utils/aws');
const name = table.set('content').TableName;

module.exports = {

  table: () => table.table(name),
  count: () => table.count(name),
  get: (id) => table.get(name, id),
  all: (last) => table.all(name, last),
  find: (params, last) => table.find(name, params, last),
  index: (index, params, last) => table.index(name, index, params, last),
  search: (index, key, values) => table.index_search(name, index, key, values),

  create: (params) => table.get(name, params.id).then(data => {
    if (!data) return table.create(name, params);
  }),

  update: (id, params) => table.get(name, id).then(data => {
    if (data) return table.update(name, id, params);
  }),

  delete: (id) => table.get(name, id).then(data => {
    if (data) return table.delete(name, id);
  }),

}