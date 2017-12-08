import first from 'lodash/first';
import map from 'lodash/map';
import includes from 'lodash/includes';
import set from 'lodash/set';

import collections from '../collections';
import find from '../lib/find';

const updateMany = (query, updaters, model) =>
  new Promise((resolve, reject) => {
    try {
      let collection = collections[model.name];
      if (!collection) {
        collections[model.name] = {
          documents: [],
          id: 0,
        };
        collection = collections[model.name];
      }
      const docs = first(find(collection.documents, query));
      const docIds = map(docs, 'id');
      collection.documents = collection.documents.map(
        document => {
          if (includes(docIds, document.id)) {
            const doc = document;
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
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });

export default updateMany;
