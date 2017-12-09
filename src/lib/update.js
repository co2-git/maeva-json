import get from 'lodash/get';
import set from 'lodash/set';

const update = (document, updaters) => {
  for (const updater of updaters) {
    switch (updater.operator) {
    case 'set':
      set(document, updater.field, updater.value);
      break;
    case 'add':
      set(
        document,
        updater.field,
        get(document, updater.field) + updater.value
      );
      break;
    case 'subtract':
      set(
        document,
        updater.field,
        get(document, updater.field) - updater.value
      );
      break;
    case 'multiply':
      set(
        document,
        updater.field,
        get(document, updater.field) * updater.value
      );
      break;
    }
  }
};

export default update;
