import first from 'lodash/first';

import collections from '../collections';
import find from '../lib/find';

const removeOne = (query, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const removed = first(find(collection.documents, query));
    collection.documents = collection.documents.filter(
      document => document.id !== removed.id
    );
    resolve(removed);
  } catch (error) {
    reject(error);
  }
});

export default removeOne;
