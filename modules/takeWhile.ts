'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (...args) {
  let [source, predicate] = args;
  if (this !== undefined && this !== null && args.length < 2) {
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
    yield next.value;
    next = source.next();
  }
}