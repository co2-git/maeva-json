import collections from '../collections';
import find from '../lib/find';

const removeById = (id, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const removed = find(collection.documents, {id});
    collection.documents = collection.documents.filter(
      document => document.id !== removed.id
    );
    resolve(removed);
  } catch (error) {
    reject(error);
  }
});

export default removeById;
