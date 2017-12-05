import includes from 'lodash/includes';
import map from 'lodash/map';

import collections from '../collections';

const removeByIds = (ids, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const removed = collection.documents.filter(
      document => includes(ids, document.id)
    );
    const removedIds = map(removed, 'id');
    collection.documents = collection.documents.filter(
      document => !includes(removedIds, document.id)
    );
    resolve(removed);
  } catch (error) {
    reject(error);
  }
});

export default removeByIds;
