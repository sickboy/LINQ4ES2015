'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  
  if (predicate == null || predicate == undefined) {
    throw new Error('predicate is null or undefined');
  }
  if (!utils.isFunc(predicate)) {
    throw new Error('predicate must be a function');
  }

  let index = 0;
  let next = source.next();
  while (!next.done) {
    if (!predicate(next.value, index)) {
      break;
    }
    index++;
    next = source.next();
  }
  while (!next.done) {
    yield next.value;
    next = source.next();
  }
}