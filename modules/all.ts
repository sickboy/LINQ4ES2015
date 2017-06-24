'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (...args) {
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


  let next = source.next();
  while (!next.done) {
    if (!predicate(next.value)) {
      return false;
    }
    next = source.next();
  }
  return true;
}
