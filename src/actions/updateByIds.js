import includes from 'lodash/includes';

import collections from '../collections';
import update from '../lib/update';

const updateByIds = (ids, updaters, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const docs = [];
    collection.documents = collection.documents.map(
      document => {
        if (includes(ids, document.id)) {
          update(document, updaters);
          const doc = document;
          docs.push(doc);
          return doc;
        }
        return document;
      }
    );
    resolve(docs);
  } catch (error) {
    reject(error);
  }
});

export default updateByIds;
