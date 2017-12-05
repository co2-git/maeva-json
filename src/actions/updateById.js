import collections from '../collections';

const updateById = (id, updater, model) => new Promise((resolve, reject) => {
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
          doc = {...document, ...updater};
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
