import first from 'lodash/first';
import set from 'lodash/set';

import collections from '../collections';
import find from '../lib/find';

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
          for (const updater of updaters) {
            switch (updater.operator) {
            case 'set':
              set(document, updater.field, updater.value);
              break;
            }
          }
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
