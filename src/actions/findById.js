import first from 'lodash/first';

import collections from '../collections';
import find from '../lib/find';

const findById = (id, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const query = [
      {
        field: 'id',
        operator: 'is',
        value: id
      }
    ];
    const docs = find(collection.documents, query);
    resolve(first(docs));
  } catch (error) {
    reject(error);
  }
});

export default findById;
