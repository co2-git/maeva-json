import first from 'lodash/first';

import collections from '../collections';
import find from '../lib/find';
import update from '../lib/update';

const updateOne = (query, updaters, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const doc = first(find(collection.documents, query));
    collection.documents = collection.documents.map(
      document => {
        if (document.id === doc.id) {
          update(document, updaters);
        }
        return document;
      }
    );
    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default updateOne;
