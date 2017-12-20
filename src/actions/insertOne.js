import collections from '../collections';
import insert from '../lib/insert';

const insertOne = (fields, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const newDoc = {...insert(fields), id: collection.id++};
    collection.documents.push(newDoc);
    resolve(newDoc);
  } catch (error) {
    reject(error);
  }
});

export default insertOne;
