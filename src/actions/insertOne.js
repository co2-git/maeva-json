import collections from '../collections';

const insertOne = (doc, model) => new Promise((resolve, reject) => {
  try {
    let collection = collections[model.name];
    if (!collection) {
      collections[model.name] = {
        documents: [],
        id: 0,
      };
      collection = collections[model.name];
    }
    const newDoc = {...doc, id: collection.id++};
    collection.documents.push(newDoc);
    resolve(newDoc);
  } catch (error) {
    reject(error);
  }
});

export default insertOne;
