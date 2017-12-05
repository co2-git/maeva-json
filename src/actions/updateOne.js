import collections from '../collections';
import find from '../lib/find';
import first from '../lib/first';

const updateOne = (query, updater, model) => new Promise((resolve, reject) => {
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
          return {...document, ...updater};
        }
        return document;
      }
    );
  } catch (error) {
    reject(error);
  }
});

export default updateOne;
