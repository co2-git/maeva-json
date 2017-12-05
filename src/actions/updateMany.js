import collections from '../collections';
import find from '../lib/find';
import first from '../lib/first';
import map from 'lodash/map';
import includes from 'lodash/includes';

const updateMany = (query, updater, model) => new Promise((resolve, reject) => {
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
          return {...document, ...updater};
        }
        return document;
      }
    );
  } catch (error) {
    reject(error);
  }
});

export default updateMany;
