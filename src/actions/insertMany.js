import collections from '../collections';

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
    const $docs = docs.map(doc => ({...doc, id: collection.id++}));
    collection.documents.push(...$docs);
    resolve($docs);
  } catch (error) {
    reject(error);
  }
});

export default insertMany;
