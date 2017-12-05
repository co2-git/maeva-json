import includes from 'lodash/includes';

import collections from '../collections';

const updateByIds = (ids, updater, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    let doc;
    collection.documents = collection.documents.map(
      document => {
        if (includes(ids, document.id)) {
          doc = {...document, ...updater};
          return doc;
        }
        return document;
      }
    );
    resolve(doc);
  } catch (error) {
    reject(error);
  }
});

export default updateByIds;
