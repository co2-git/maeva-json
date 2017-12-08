import every from 'lodash/every';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import uniqBy from 'lodash/uniqBy';

// WHERE A = [A]
// WHERE A AND B = [A, B]
// WHERE A OR B = [{or: [A, B]}]
// WHERE (A AND B) OR (C AND D) = [{or: [[A, B], [C, D]]}]
// WHERE (A OR B) AND (C OR D) = [{or: [A, B]}, {or: [C, D]}]

const parseRegExp = pattern => {
  const flags = [];
  pattern = pattern.replace(/^\//, '');
  if (/\/$/.test(pattern)) {
    pattern = pattern.replace(/\/$/, '');
  } else {
    flags.push(pattern.replace(/^.+\/([a-z]+)$/, '$1'));
    pattern = pattern.replace(/\/([a-z]+)$/, '');
  }
  return new RegExp(pattern, flags);
};

const filter = (document, {field, operator, value}) => {
  const actual = get(document, field);
  if (typeof actual === 'undefined') {
    return false;
  }
  if (operator === 'above' && actual <= value) {
    return false;
  }
  if (operator === 'below' && actual >= value) {
    return false;
  }
  if (operator === 'in' && !some(value, _value => isEqual(actual, _value))) {
    return false;
  }
  if (operator === 'is' && !isEqual(actual, value)) {
    return false;
  }
  if (operator === 'match' && !parseRegExp(value).test(actual)) {
    return false;
  }
  if (operator === 'not' && isEqual(actual, value)) {
    return false;
  }
  if (operator === 'out' && !every(value, _value => !isEqual(actual, _value))) {
    return false;
  }
  return true;
};

const find = (documents, queries, options = {}) => {
  let docs = [...documents];
  for (const query of queries) {
    if (query.or) {
      const ff = [];
      for (const orQuery of query.or) {
        for (const andQuery of orQuery) {
          ff.push(...docs.filter(document => filter(document, andQuery)));
        }
      }
      docs = uniqBy(ff, 'id');
    } else {
      docs = docs.filter(document => filter(document, query));
    }
  }
  if ('sort' in options) {
    if (typeof options.sort === 'string') {
      docs = orderBy(docs, [options.sort], ['asc']);
    } else if (Array.isArray(options.sort)) {

    } else if (typeof options.sort === 'object') {
      for (const field in options.sort) {
        if (options.sort === 1) {
          docs = orderBy(docs, [field], ['asc']);
        } else if (options.sort === -1) {
          docs = orderBy(docs, [field], ['desc']);
        }
      }
    }
  }
  if ('range' in options) {
    if (typeof options.range === 'number') {
      docs = take(docs, options.range);
    } else if (
      Array.isArray(options.range) &&
      typeof options.range[0] === 'number' &&
      typeof options.range[1] === 'number'
    ) {
      docs = takeRight(docs, docs.length - options.range[0]);
      docs = take(docs, options.range[1]);
    }
  }
  return docs;
};

export default find;
