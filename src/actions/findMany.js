import collections from '../collections';
import find from '../lib/find';

const findMany = (query, model, options = {}) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const docs = find(collection.documents, query, options);
    resolve(docs);
  } catch (error) {
    reject(error);
  }
});

export default findMany;
