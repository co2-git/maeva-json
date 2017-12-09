import map from 'lodash/map';
import includes from 'lodash/includes';

import collections from '../collections';
import find from '../lib/find';
import update from '../lib/update';

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
      const docs = find(collection.documents, query);
      const docIds = map(docs, 'id');
      collection.documents = collection.documents.map(
        document => {
          if (includes(docIds, document.id)) {
            update(document, updaters);
            const doc = document;
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
