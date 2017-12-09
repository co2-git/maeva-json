import collections from '../collections';
import update from '../lib/update';

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
          update(document, updaters);
          doc = document;
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
