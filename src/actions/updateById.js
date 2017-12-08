import set from 'lodash/set';

import collections from '../collections';

const updateById = (id, updaters, model) => new Promise((resolve, reject) => {
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
        if (document.id === id) {
          doc = document;
          for (const updater of updaters) {
            switch (updater.operator) {
            case 'set':
              set(doc, updater.field, updater.value);
              break;
            }
          }
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

export default updateById;
