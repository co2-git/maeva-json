import _keys from 'lodash/keys';
import get from 'lodash/get';
import includes from 'lodash/includes';

import isPrimitive from './isPrimitive';

const find = (documents, query) => {
  console.log(require('util').inspect({query}, {depth: null}));
  const keys = _keys(query).length;
  if (!keys) {
    return documents;
  }
  return documents.reduce(
    (found, document) => {
      let matches = 0;
      for (const key in query) {
        let value = query[key];
        if (isPrimitive(value)) {
          if (/\./.test(key)) {
            if (get(document, key) === query[key]) {
              matches++;
            }
          } else if ((key in document) && document[key] === query[key]) {
            matches++;
          }
        } else if (typeof value === 'object') {
          for (const metaKey in value) {
            switch (metaKey) {
            case 'in':
              if (includes(value.in, document[key])) {
                matches++;
              }
              break;
            case 'out':
              if (!includes(value.out, document[key])) {
                matches++;
              }
              break;
            case 'not':
              if (document[key] !== value.not) {
                matches++;
              }
              break;
            }
          }
        }
      }
      if (matches === keys) {
        found.push(document);
      }
      return found;
    },
    []
  );
};

export default find;
