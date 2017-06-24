'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (...args) {
  let [source, predicate] = args;
  if (this !== undefined && this !== null && args.length < 2 && (!source || utils.isFunc(source))) {
    predicate = source;
    source = this;
  }
  
  if (Array.isArray(source)) {
    if (!predicate) {
      if (source.length === 0) return null;
      if (source.length !== 1) throw new Error('Sequence contains more than one element');
      return source[0];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(predicate)) {
    predicate = undefined;
  }

  let next = source.next();
  let result = next.value;
  if (!predicate) {
    if (next.done) {
      return null;
    }
    next = source.next();
    if (!next.done) {
      throw new Error('Sequence contains more than one element');
    }
    return result;
  }

  let found = false;
  while (!next.done) {
    if (predicate(next.value)) {
      if (found) {
        throw new Error('Sequence contains more than one matching element');
      }
      found = true;
      result = next.value;
    }
    next = source.next();
  }
  if (!found) {
    return null;
  }
  return result;
};
