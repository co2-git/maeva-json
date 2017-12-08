import includes from 'lodash/includes';
import set from 'lodash/set';

import collections from '../collections';

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
          const doc = document;
          for (const updater of updaters) {
            switch (updater.operator) {
            case 'set':
              set(doc, updater.field, updater.value);
              break;
            }
          }
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
