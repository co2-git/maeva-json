import collections from '../collections';
import insert from '../lib/insert';

const insertMany = (docs, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const $docs = [];
    for (const fields of docs) {
      $docs.push({id: collection.id++, ...insert(fields)});
    }
    collection.documents.push(...$docs);
    resolve($docs);
  } catch (error) {
    reject(error);
  }
});

export default insertMany;
