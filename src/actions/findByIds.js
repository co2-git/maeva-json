import includes from 'lodash/includes';

import collections from '../collections';

const findByIds = (ids, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const docs = collection.documents.filter(
      document => includes(ids, document.id)
    );
    resolve(docs);
  } catch (error) {
    reject(error);
  }
});

export default findByIds;
